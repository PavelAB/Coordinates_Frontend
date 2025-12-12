import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { SpotParams } from '@features/map.component/models/SpotsParams';
import { ORS_Track } from '../drawers/models/ORSTrack';
import { Result } from '@shared/models/Result';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'environments/environment.development';
import { addParams } from '@shared/utils/addParams';
import { toSignal } from '@angular/core/rxjs-interop';
import { ORSParams } from '../drawers/models/ORSParams';


const BASE_URL = environment.API_URL

@Injectable({
  providedIn: 'root',
})
export class OrsApiService {
    
    private readonly _http = inject(HttpClient);

    getTrack(params: ORSParams): Observable<ORS_Track> {
    return this._http
      .get<Result<ORS_Track>>(
        `${environment.API_URL}/ORS/GetORSTrack`,
        { params: addParams(params) }
      )
      .pipe(
        map(res => res.Content as ORS_Track),
      );
  }
}
