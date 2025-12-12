import { Component, effect, inject, signal } from '@angular/core'
import { MenuDrawerComponent } from "./drawers/menu-drawer.component/menu-drawer.component"
import { SpotService } from './services/spot.service'
import { SpotParams } from './models/SpotsParams'
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat, toLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import CircleStyle from 'ol/style/Circle'
import Feature from 'ol/Feature'
import { LineString, Point } from 'ol/geom'
import Translate from 'ol/interaction/Translate.js'
import { PointType } from './models/Points'
import { MapStateService } from './services/map-state.service'
import { Spot } from './models/Spot'
import { OrsStore } from './services/ors-store.service'


type PointMode = 'none' | 'start' | 'end'

@Component({
    selector: 'app-map.component',
    imports: [MenuDrawerComponent],
    templateUrl: './map.component.html',
    styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {

    currentMode: PointMode = 'none'

    private readonly _spotService = inject(SpotService)
    private readonly mapState = inject(MapStateService)
    private readonly orsStore = inject(OrsStore)

    spotsLight = this._spotService.getSpotsLight({} as SpotParams)
    private orsTrack = this.orsStore.track
    firstModalOpen = signal(false)

    // Map variables    

    @ViewChild('mapElement', { static: false })
    mapElement!: ElementRef<HTMLDivElement>

    private map!: Map

    private markerSource = new VectorSource()
    private routeSource = new VectorSource()
    private markerLayer = new VectorLayer({
        source: this.markerSource,
        style: feature => {
            const explicitColor = feature.get('color') as string | undefined
            const type = feature.get('type') as 'start' | 'end'

            const fallbackColor = '#444444'

            const color = explicitColor ?? fallbackColor

            return new Style({
                image: new CircleStyle({
                    radius: 6,
                    fill: new Fill({ color: '#ffffff' }),
                    stroke: new Stroke({ color, width: 2 })
                })
            })
        }
    })
    private routeLayer = new VectorLayer({
        source: this.routeSource,
        style: new Style({
            stroke: new Stroke({
                width: 3,
                color: '#b65555ff'
            })
        })
    })

    private startFeature: Feature<Point> | null = null
    private endFeature: Feature<Point> | null = null    

    // Effects

    private readonly _trackEffect = effect(() => {
        const t = this.orsTrack()
        if (!t || t?.Distance <= 0 || !t?.PolyLine) return

        const polyline: number[][] = JSON.parse(t.PolyLine)
        const points: [number, number][] = polyline.map(([lon, lat]) => [lon, lat])

        this.drawRoute(points)

    })

    // Functions

    toggleDrawer() {
        this.firstModalOpen.update(v => !v)
    }

    setMode(mode: PointMode) {
        this.currentMode = mode
    }

    private updatePoints(key: PointType, lon: number, lat: number) {

        this.mapState.routePoints.update(prev => {
            const next = { ...prev }
            next[key] = { lon, lat }
            return next
        })
    }

    addPoints(): void {
        let points: Spot[] | null = []

        if (this.spotsLight)
            points = this.spotsLight()

        if (!points)
            throw new Error("Points can't be null")

        const features = points.map((p: Spot) => {
            const feature = new Feature<Point>({
                geometry: new Point(fromLonLat([p.Longitude, p.Latitude]))
            })
            feature.set('draggable', false)
            return feature
        })

        this.markerSource.addFeatures(features)
    }

    ngAfterViewInit(): void {
        this.map = new Map({
            target: this.mapElement.nativeElement,
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                this.routeLayer,
                this.markerLayer
            ],
            view: new View({
                center: fromLonLat([4.3517, 50.8503]),
                zoom: 12
            })
        })

        // 1) Click sur la carte → créer / déplacer le point
        this.map.on('click', event => {
            if (this.currentMode === 'none')
                return

            const [lon, lat] = toLonLat(event.coordinate)

            if (this.currentMode === 'start') {
                if (!this.startFeature) {
                    this.startFeature = new Feature<Point>({
                        geometry: new Point(event.coordinate)
                    })

                    this.startFeature.set('type', 'start')
                    this.startFeature.set('color', '#ff0000')
                    this.startFeature.set('draggable', true)

                    this.markerSource.addFeature(this.startFeature)
                } else {
                    const geom = this.startFeature.getGeometry() as Point
                    geom.setCoordinates(event.coordinate)
                }

                this.updatePoints('start', lon, lat)
            }

            if (this.currentMode === 'end') {
                if (!this.endFeature) {
                    this.endFeature = new Feature<Point>({
                        geometry: new Point(event.coordinate)
                    })

                    this.endFeature.set('type', 'end')
                    this.endFeature.set('color', '#0000ff')
                    this.endFeature.set('draggable', true)


                    this.markerSource.addFeature(this.endFeature)
                } else {
                    const geom = this.endFeature.getGeometry() as Point
                    geom.setCoordinates(event.coordinate)
                }

                this.updatePoints('end', lon, lat)
            }

            this.currentMode = 'none'
        })


        // 2) Interaction de drag sur le point
        const translate = new Translate({
            layers: [this.markerLayer],
            filter: (feature, layer) => {
                return feature.get('draggable') === true
            }
        })

        this.map.addInteraction(translate)

        translate.on('translateend', e => {
            const feature = e.features.item(0) as Feature<Point>
            const type = feature.get('type') as 'start' | 'end'
            const geometry = feature.getGeometry() as Point
            const coordMap = geometry.getCoordinates()
            const [lon, lat] = toLonLat(coordMap)

            feature.set('lon', lon)
            feature.set('lat', lat)

            if (type === 'start')
                this.updatePoints(type, lon, lat)

            if (type === 'end')
                this.updatePoints(type, lon, lat)

        })
    }

    drawRoute(points: [number, number][]): void {
        const projected = points.map(p => fromLonLat(p))

        const line = new LineString(projected)
        const feature = new Feature({ geometry: line })

        this.routeSource.clear() 
        this.routeSource.addFeature(feature)

        this.map.getView().fit(line.getExtent(), {
            padding: [50, 50, 50, 50],
            maxZoom: 16
        })
    }
}
