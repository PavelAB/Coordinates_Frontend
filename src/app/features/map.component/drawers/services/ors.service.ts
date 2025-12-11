import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { SpotParams } from '@features/map.component/models/SpotsParams';
import { ORS_Track } from '../models/ORSTrack';
import { Result } from '@shared/models/Result';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'environments/environment.development';
import { addParams } from '@shared/utils/addParams';
import { toSignal } from '@angular/core/rxjs-interop';
import { ORSParams } from '../models/ORSParams';


const BASE_URL = environment.API_URL

@Injectable({
  providedIn: 'root',
})
export class OrsService {
    
    private readonly _http = inject(HttpClient);
    private orsTrack = signal<ORS_Track|null>(null);

    // public getORSTrack(params: ORSParams){
    //     return toSignal()
        
    //     const request$: Observable<ORS_Track> = this._http
    //         .get<Result<ORS_Track>>(`${BASE_URL}/ORS/GetORSTrack`, {
    //             params: addParams(params)
    //         })
    //         .pipe(
    //             map((res: Result<ORS_Track>) => res.Content as ORS_Track),
    //             catchError((err: HttpErrorResponse) => {
    //                 console.log('Erreur ORS: ', err)
    //                 return of({} as ORS_Track)                
    //         })
    //     )
    //     return toSignal(request$, { initialValue: [] })        
    // }

    public getORSTrack(params: ORSParams) : Signal<ORS_Track >{        
        const request$: Observable<ORS_Track> = this._http
            .get<Result<ORS_Track>>(`${BASE_URL}/ORS/GetORSTrack`, {
                params: addParams(params)
            })
            .pipe(
                map((res: Result<ORS_Track>) => res.Content as ORS_Track),
                catchError((err: HttpErrorResponse) => {
                    console.log('Erreur ORS: ', err)
                    return of({} as ORS_Track)                
            })
        )
        return toSignal(request$, { initialValue: {} as ORS_Track })        
    }
}
