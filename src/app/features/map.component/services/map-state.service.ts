import { Injectable, signal } from '@angular/core'
import { RoutePoints } from '../models/Points'

@Injectable({
    providedIn: 'root',
})
export class MapStateService {

    routePoints = signal<RoutePoints>({
        start: null,
        end: null
    })
}
