import { Component, inject, OnDestroy, OnInit, output, OutputEmitterRef } from '@angular/core';
import { MapStateService } from '@features/map.component/services/map-state.service';
import { ORSParams } from '../models/ORSParams'
import { ORS_Track } from '../models/ORSTrack'

@Component({
    selector: 'app-menu-drawer',
    imports: [],
    templateUrl: './menu-drawer.component.html',
    styleUrl: './menu-drawer.component.scss',
})
export class MenuDrawerComponent implements OnInit, OnDestroy {

    private readonly mapState = inject(MapStateService)

    routePoints = this.mapState.routePoints

    closeDrawer: OutputEmitterRef<void> = output()


    ngOnInit(): void {
        console.log("Drawer opened ")
    }

    ngOnDestroy(): void {
        console.log("Drawer closed")
    }

    handleClick() {
        this.closeDrawer.emit()
    }

    handleDisplayTrack():void{
        console.log("track =>", this.mapState.newTrack())               
    }


    // handleUpdateTrack():void{
    //     console.log("Response TRACK ===>", this.trackResponse!())
    //     let temp: ORS_Track = this.trackResponse!() as ORS_Track
    //     console.log("temp +>+ ", temp);
    //     this.mapState.newTrack.update(prev => {return temp})
    //     console.log("update DONE");        
    // }

    handleGenerateTrack(): void {

        if (!this.routePoints().start || !this.routePoints().end)
            throw new Error("Start ou end point is undefined or null")       


        let params: ORSParams = new ORSParams(
            this.roundCoordinates(this.routePoints().start!.lon),
            this.roundCoordinates(this.routePoints().start!.lat),
            this.roundCoordinates(this.routePoints().end!.lon),
            this.roundCoordinates(this.routePoints().end!.lat),
        )

    }

    roundCoordinates(value: number):number{
        return Math.round(value * 1e6) / 1e6
    }

    // testDisplaySignal():void{
    //     console.log("SIGNAL ===>", this.trackResponse!());        
    // }



}
