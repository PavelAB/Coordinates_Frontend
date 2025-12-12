import { Component, effect, inject, OnDestroy, OnInit, output, OutputEmitterRef } from '@angular/core'
import { MapStateService } from '@features/map.component/services/map-state.service'
import { ORSParams } from '../models/ORSParams'
import { OrsStore } from '@features/map.component/services/ors-store.service'

@Component({
    selector: 'app-menu-drawer',
    imports: [],
    templateUrl: './menu-drawer.component.html',
    styleUrl: './menu-drawer.component.scss',
})
export class MenuDrawerComponent implements OnInit, OnDestroy {

    private readonly mapState = inject(MapStateService)
    private readonly orsStore = inject(OrsStore)

    routePoints = this.mapState.routePoints
    readonly track = this.orsStore.track

    closeDrawer: OutputEmitterRef<void> = output()


    private readonly _trackEffect = effect(() => {
        const t = this.track()
        if (!t) return
        console.log('Track changed', t)
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

    roundCoordinates(value: number): number {
        return Math.round(value * 1e6) / 1e6
    }

}
