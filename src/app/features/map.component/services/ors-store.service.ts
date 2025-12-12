import { inject, Injectable, Resource, resource, ResourceLoaderParams, signal } from '@angular/core'
import { OrsApiService } from './orsApi.service'
import { ORSParams } from '../drawers/models/ORSParams'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { firstValueFrom, of, startWith, switchMap } from 'rxjs'
import { ORS_Track } from '../drawers/models/ORSTrack'

@Injectable({
    providedIn: 'root',
})
export class OrsStore {
    private api = inject(OrsApiService);

    private readonly _params = signal<ORSParams | null>(null);

    readonly track: Resource<ORS_Track | null | undefined> = resource({
        params: () => this._params(),
        loader: async (
            { params }: ResourceLoaderParams<ORSParams | null>): Promise<ORS_Track | null | undefined> => {
            if (!params) {
                return null
            }

            return firstValueFrom(this.api.getTrack(params))
        }
    });

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
