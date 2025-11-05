import { Component, signal } from '@angular/core';
import { MenuDrawerComponent } from "./drawers/menu-drawer.component/menu-drawer.component";

@Component({
  selector: 'app-map.component',
  imports: [MenuDrawerComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
    firstModalOpen = signal(false)

    toggleDrawer(){
        this.firstModalOpen.update(v => !v)
        console.log("test => ", this.firstModalOpen());
        
    }
}
