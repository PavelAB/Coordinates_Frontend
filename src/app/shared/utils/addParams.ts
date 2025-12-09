import { HttpParams } from "@angular/common/http";
import { SpotParams } from "@features/map.component/models/SpotsParams";

export function addParams(params: SpotParams): HttpParams{
    let httpParams = new HttpParams()

    if (params) {
        for (const [key, value] of Object.entries(params)) {
            if (value !== null && value !== undefined) {
                console.log('param :', key, 'valeur :', value)
                httpParams = httpParams.set(key, String(value))
            }
        }
    }

    return httpParams;
}