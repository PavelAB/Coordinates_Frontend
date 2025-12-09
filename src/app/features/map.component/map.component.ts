import { Component, effect, inject, signal } from '@angular/core';
import { MenuDrawerComponent } from "./drawers/menu-drawer.component/menu-drawer.component";
import { SpotService } from './services/spot.service';
import { SpotParams } from './models/SpotsParams';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Attribution from 'ol/control/Attribution.js';
import { fromLonLat } from 'ol/proj'

@Component({
  selector: 'app-map.component',
  imports: [MenuDrawerComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit{
    
    private readonly _spotService = inject(SpotService)

    spots = this._spotService.spots
    spotsLight = this._spotService.spotsLight
    
    firstModalOpen = signal(false)

    test = effect(() => {
            console.log('Nouvelle valeur de count :', this.spots())
        })
    test2 = effect(() => {
            console.log('Nouvelle valeur de count Light:', this.spotsLight())
        })

    toggleDrawer(){
        this.firstModalOpen.update(v => !v)
        console.log("test => ", this.firstModalOpen())
        this._spotService.getSpotsLight({} as SpotParams)
        this._spotService.getSpots({} as SpotParams)
        
    }


    @ViewChild('mapElement', { static: false })
  mapElement!: ElementRef<HTMLDivElement>

  private map!: Map

  ngAfterViewInit(): void {
    this.map = new Map({
      target: this.mapElement.nativeElement,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([4.3517, 50.8503]), // Bruxelles
        zoom: 12
      })
    })
  }
}
