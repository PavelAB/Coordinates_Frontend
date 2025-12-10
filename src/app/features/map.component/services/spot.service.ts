import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { AuthService } from '@features/auth.component/services/auth.service';
import { environment } from 'environments/environment.development';
import { SpotParams } from '../models/SpotsParams';
import { Result } from '@shared/models/Result';
import { Spot } from '../models/Spot';
import { addParams } from '@shared/utils/addParams';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, Observable } from 'rxjs';
import { CrudService } from '@core/services/crud.service';



const BASE_URL = environment.API_URL

@Injectable({
  providedIn: 'root',
})
export class SpotService {

    private readonly _http = inject(HttpClient)
    private readonly crud = new CrudService<Spot, SpotParams>(`${BASE_URL}/Spot`)

    public getSpotsLight(params: SpotParams){
        const request$: Observable<Spot[]> = this._http
            .get<Result<Spot[]>>(`${BASE_URL}/Spot/GetSpotsLight`, {
                params: addParams(params)
            })
            .pipe(
                map((res: Result<Spot[]>) => res.Content as Spot[]),
                catchError((err: HttpErrorResponse) => {
                    console.log('Erreur GetSpotsLight', err)
                    return of([] as Spot[])                
            })
        )
        return toSignal(request$, { initialValue: [] })
        
    }

    public getSpots(params: SpotParams){
        return this.crud.getAll('GetSpots', params)        
    }
}
