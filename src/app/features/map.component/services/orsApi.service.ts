import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { ORS_Track } from '../drawers/models/ORSTrack'
import { Result } from '@shared/models/Result'
import { map, Observable } from 'rxjs'
import { environment } from 'environments/environment.development'
import { addParams } from '@shared/utils/addParams'
import { ORSParams } from '../drawers/models/ORSParams'


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
      )
  }
}
