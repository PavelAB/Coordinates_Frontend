import { HttpParams } from "@angular/common/http"
import { ORSParams } from "@features/map.component/drawers/models/ORSParams"
import { SpotParams } from "@features/map.component/models/SpotsParams"
import { TrackParams } from "@features/map.component/models/TrackParams"

export function addParams<T extends SpotParams | ORSParams | TrackParams>(params: T): HttpParams {
    let httpParams = new HttpParams()

    if (params) {
        for (const [key, value] of Object.entries(params)) {
            if (value !== null && value !== undefined) {
                console.log('param :', key, 'valeur :', value)
                httpParams = httpParams.set(key, String(value))
            }
        }
    }

    return httpParams
}