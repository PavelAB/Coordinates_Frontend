import { Component, effect, inject, signal } from '@angular/core';
import { MenuDrawerComponent } from "./drawers/menu-drawer.component/menu-drawer.component";
import { SpotService } from './services/spot.service';
import { SpotParams } from './models/SpotsParams';

@Component({
  selector: 'app-map.component',
  imports: [MenuDrawerComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
    
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
}
