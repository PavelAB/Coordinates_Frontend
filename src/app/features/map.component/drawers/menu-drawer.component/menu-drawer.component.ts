import { Component, inject, input, InputSignal, OnDestroy, OnInit, output, OutputEmitterRef } from '@angular/core';
import { MapStateService } from '@features/map.component/services/map-state.service';

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

    handleClick(){
        this.closeDrawer.emit()
    }



}
