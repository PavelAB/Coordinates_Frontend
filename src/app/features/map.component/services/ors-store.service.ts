import { inject, Injectable, signal } from '@angular/core'
import { OrsApiService } from './orsApi.service'
import { ORSParams } from '../drawers/models/ORSParams'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { of, startWith, switchMap } from 'rxjs'
import { ORS_Track } from '../drawers/models/ORSTrack'

@Injectable({
    providedIn: 'root',
})
export class OrsStore {
    private readonly api = inject(OrsApiService)

    private readonly _params = signal<ORSParams | null>(null)
    readonly params = this._params.asReadonly()

    readonly track = toSignal(
        toObservable(this.params).pipe(
            switchMap(params => (params ? this.api.getTrack(params) : of(null))),
            startWith(null as ORS_Track | null)
        ),
        { initialValue: null }
    )


    loadTrack(params: ORSParams): void {
        const current = this._params()

        if (current && JSON.stringify(params) === JSON.stringify(current)) {
            return
        }

        this._params.set(params)
    }

    clear(): void {
        this._params.set(null)
    }
}
