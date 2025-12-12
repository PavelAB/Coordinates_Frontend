import { Component, effect, inject, OnDestroy, OnInit, output, OutputEmitterRef, signal } from '@angular/core'
import { MapStateService } from '@features/map.component/services/map-state.service'
import { ORSParams } from '../models/ORSParams'
import { OrsStore } from '@features/map.component/services/ors-store.service'
import { TrackService } from '@features/map.component/services/track.service'
import { TrackToCreate } from '@features/map.component/models/Track'
import { AuthService } from '@features/auth.component/services/auth.service'

@Component({
    selector: 'app-menu-drawer',
    imports: [],
    templateUrl: './menu-drawer.component.html',
    styleUrl: './menu-drawer.component.scss',
})
export class MenuDrawerComponent implements OnInit, OnDestroy {

    private readonly mapState = inject(MapStateService)
    private readonly trackService = inject(TrackService)
    private readonly orsStore = inject(OrsStore)
    private readonly _auth = inject(AuthService)


    user = this._auth.user
    routePoints = this.mapState.routePoints
    readonly track = this.orsStore.track
    readonly createResult = signal<boolean | null>(null)

    closeDrawer: OutputEmitterRef<void> = output()


    private readonly _trackEffect = effect(() => {
        const t = this.track()
        if (!t) return
        console.log('Track changed', t)
    })

    private readonly _ResultEffect = effect(() => {
        const result = this.createResult()
        if (!result) return
        console.log('Track created !', result)
    })

    ngOnInit(): void {
        console.log("Drawer opened ")
    }

    ngOnDestroy(): void {
        console.log("Drawer closed")
    }

    handleClick() {
        this.closeDrawer.emit()
    }

    handleGenerateTrack(): void {

        if (!this.routePoints().start || !this.routePoints().end)
            throw new Error("Start ou end point is undefined or null")


        let params: ORSParams = new ORSParams(
            this.roundCoordinates(this.routePoints().start!.lon),
            this.roundCoordinates(this.routePoints().start!.lat),
            this.roundCoordinates(this.routePoints().end!.lon),
            this.roundCoordinates(this.routePoints().end!.lat),
        )

        this.orsStore.loadTrack(params)

    }

    handleCreateTrack(): void {

        const t = this.track()


        if (!t) return


        const newTrack: TrackToCreate = {
            distance: t.Distance,
            ascent: t.Ascent,
            descent: t.Descent,
            polyline: t.PolyLine,
            name: "1st Try",
            isPrivate: false,
            surfaces: null,
            entityTypes: null,
            createdBy: this.user()?.IdUser as string
        }

        this.trackService.createTrack(newTrack).subscribe(result => {
            this.createResult.set(result)
        })
    }

    roundCoordinates(value: number): number {
        return Math.round(value * 1e6) / 1e6
    }

}
