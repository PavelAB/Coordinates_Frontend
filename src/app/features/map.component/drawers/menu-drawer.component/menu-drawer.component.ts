import { Component, input, InputSignal, OnDestroy, OnInit, output, OutputEmitterRef } from '@angular/core';

@Component({
  selector: 'app-menu-drawer',
  imports: [],
  templateUrl: './menu-drawer.component.html',
  styleUrl: './menu-drawer.component.scss',
})
export class MenuDrawerComponent implements OnInit, OnDestroy {
    
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
