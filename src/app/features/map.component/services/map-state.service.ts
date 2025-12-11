import { Injectable, signal } from '@angular/core';
import { RoutePoints } from '../models/Points';
import { ORS_Track } from '../drawers/models/ORSTrack';

@Injectable({
  providedIn: 'root',
})
export class MapStateService {
    
    routePoints = signal<RoutePoints>({
        start: null,
        end: null
    })

    newTrack = signal<ORS_Track | null>(null)
}
