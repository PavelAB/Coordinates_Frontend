import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { AuthService } from '@features/auth.component/services/auth.service';
import { environment } from 'environments/environment.development';
import { SpotParams } from '../models/SpotsParams';
import { Result } from '@shared/models/Result';
import { Spot } from '../models/Spot';
import { addParams } from '@shared/utils/addParams';
import { toSignal } from '@angular/core/rxjs-interop';



const BASE_URL = environment.API_URL

@Injectable({
  providedIn: 'root',
})
export class SpotService {

    private readonly _http = inject(HttpClient)

    private _spotsLight = signal<Spot[] | null>(null)
    private _spots = signal<Spot[] | null>(null)
    
    readonly spots = this._spots.asReadonly()
    readonly spotsLight = this._spotsLight.asReadonly()

    public getSpotsLight(params: SpotParams){
        this._http.get<Result<Spot[]>>(`${BASE_URL}/Spot/GetSpotsLight`, {
            params: addParams(params)
        }).subscribe({
            next: (res: Result<Spot[]>) => {  
                this._spotsLight.set(res.Content as Spot[])
            },
            error: (err: HttpErrorResponse) => {
                console.log("testWrong");
                const backError = err.error as Result<Spot>
            }
        })
    }
    public getSpots(params: SpotParams){
        this._http.get<Result<Spot[]>>(`${BASE_URL}/Spot/GetSpots`, {
            params: addParams(params)
        }).subscribe({
            next: (res: Result<Spot[]>) => {
                           
                this._spots.set(res.Content as Spot[])
            },
            error: (err: HttpErrorResponse) => {
                console.log("testWrong");
                const backError = err.error as Result<Spot>
            }
        })
    }
}
