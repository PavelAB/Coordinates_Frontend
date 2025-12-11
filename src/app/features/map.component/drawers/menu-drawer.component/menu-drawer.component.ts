import { Component, effect, EnvironmentInjector, inject, input, InputSignal, OnDestroy, OnInit, output, OutputEmitterRef, Resource, runInInjectionContext, signal, Signal, WritableSignal } from '@angular/core';
import { MapStateService } from '@features/map.component/services/map-state.service';
import { ORSParams } from '../models/ORSParams';
import { OrsService } from '../services/ors.service';
import { ORS_Track } from '../models/ORSTrack';

@Component({
    selector: 'app-menu-drawer',
    imports: [],
    templateUrl: './menu-drawer.component.html',
    styleUrl: './menu-drawer.component.scss',
})
export class MenuDrawerComponent implements OnInit, OnDestroy {

    private readonly injector = inject(EnvironmentInjector)
    private readonly mapState = inject(MapStateService)
    private readonly ORSService = inject(OrsService)

    // OLD and BAD exemple
    trackResponse: ReturnType<OrsService['getORSTrack']> | null = null
    //trackResponse: Signal<ORS_Track> | null = null
    

    // Good ??
    //trackResponse: WritableSignal<ORS_Track>  = signal<ORS_Track>({} as ORS_Track)

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
        console.log("track =>", this.mapState.newTrack());
               
    }
    handleUpdateTrack():void{
        console.log("Response TRACK ===>", this.trackResponse!())
        let temp: ORS_Track = this.trackResponse!() as ORS_Track
        console.log("temp +>+ ", temp);
        this.mapState.newTrack.update(prev => {return temp})
        console.log("update DONE");        
    }

    handleGenerateTrack(): void {

        if (!this.routePoints().start || !this.routePoints().end)
            throw new Error("Start ou end point is undefined or null")

        


        let params: ORSParams = new ORSParams(
            this.testTemp(this.routePoints().start!.lon),
            this.testTemp(this.routePoints().start!.lat),
            this.testTemp(this.routePoints().end!.lon),
            this.testTemp(this.routePoints().end!.lat),
        )

        
        // LD and BAD exemple 
        runInInjectionContext(this.injector, () => {
            this.trackResponse = this.ORSService.getORSTrack(params)        
        })

        

        // Good ??
        // runInInjectionContext(this.injector, () => {
        //     const test = this.ORSService.getORSTrack(params)();
        //     console.log(test);
            
        //     if(test){
        //         console.log(test)                
        //         this.trackResponse.set(test) 
        //     }
        // })



        // console.log("result => ", this.trackResponse());
        

    }

    testTemp(value: number):number{
        return Math.round(value * 1e6) / 1e6
    }

    testDisplaySignal():void{
        console.log("SIGNAL ===>", this.trackResponse!());
        
    }



}
