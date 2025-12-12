import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { CrudService } from '@core/services/crud.service'
import { TrackParams } from '../models/TrackParams'
import { Track, TrackToCreate } from '../models/Track'
import { environment } from 'environments/environment.development'


const BASE_URL = environment.API_URL

@Injectable({
    providedIn: 'root',
})
export class TrackService {
    private readonly _http = inject(HttpClient)
    private readonly crud = new CrudService<Track | TrackToCreate, TrackParams>(`${BASE_URL}/Track`)

    createTrack(track: TrackToCreate) {
        return this.crud.create("CreateTrack", track)
    }
}
