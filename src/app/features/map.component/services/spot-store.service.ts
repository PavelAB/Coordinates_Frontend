import { inject, Injectable, signal } from '@angular/core'
import { SpotApi } from './spotApi.service'
import { SpotParams } from '../models/SpotsParams'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { of, startWith, switchMap } from 'rxjs'
import { Spot } from '../models/Spot'

@Injectable({
    providedIn: 'root',
})
export class SpotStore {
    private readonly api = inject(SpotApi)

    private readonly _params = signal<SpotParams | null>(null)
    readonly params = this._params.asReadonly()

    // readonly spotsLight = toSignal(
    //     toObservable(this.params).pipe(
    //         switchMap(params => (params ? this.api.getSpotsLight(params) : of(null))),
    //         startWith(null as Spot[] | null)
    //     ),
    //     { initialValue: null }
    // )
    readonly spotsLight = toSignal(
        toObservable(this.params).pipe(
            switchMap(params => (params ? this.api.getSpots(params) : of(null))),
            startWith(null as Spot[] | null)
        ),
        { initialValue: null }
    )

    loadSpotsLight(params: SpotParams): void {
        const current = this._params()
        if (current && JSON.stringify(params) === JSON.stringify(current)) {
            return
        }
        this._params.set(params)
    }

}
