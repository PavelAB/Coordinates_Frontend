import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { toSignal } from '@angular/core/rxjs-interop'
import { Result } from '@shared/models/Result'
import { addParams } from '@shared/utils/addParams'
import { SpotParams } from '@features/map.component/models/SpotsParams'

// @Injectable({
//     providedIn: 'root',
// })
export class CrudService<T, P extends SpotParams > {
    private readonly http = inject(HttpClient)

    constructor(private readonly baseUrl: string) { }

    /** GET — récupère une liste */
    getAll(endpoint: string, params: P) {
        const request$: Observable<T[]> = this.http
            .get<Result<T[]>>(`${this.baseUrl}/${endpoint}`, {
                params: addParams<P>(params)
            })
            .pipe(
                map(res => res.Content as T[]),
                catchError((err: HttpErrorResponse) => {
                    console.error('Erreur GET', err)
                    return of([] as T[])
                })
            )

        return toSignal(request$, { initialValue: [] })
    }

    /** GET by ID — récupère un élément spécifique */
    getById(endpoint: string, id: string) {
        const request$: Observable<T | null> = this.http
            .get<Result<T>>(`${this.baseUrl}/${endpoint}/${id}`)
            .pipe(
                map(res => res.Content as T),
                catchError((err: HttpErrorResponse) => {
                    console.error('Erreur GET by ID', err)
                    return of(null)
                })
            )

        return toSignal(request$, { initialValue: null })
    }

    /** POST — crée un nouvel élément */
    create(endpoint: string, entity: T): Observable<T | null> {
        return this.http.post<Result<T>>(`${this.baseUrl}/${endpoint}`, entity).pipe(
            map(res => res.Content as T),
            catchError((err: HttpErrorResponse) => {
                console.error('Erreur POST', err)
                return of(null)
            })
        )
    }

    /** PUT — met à jour un élément */
    update(endpoint: string, id: string, entity: T): Observable<T | null> {
        return this.http.put<Result<T>>(`${this.baseUrl}/${endpoint}/${id}`, entity).pipe(
            map(res => res.Content as T),
            catchError((err: HttpErrorResponse) => {
                console.error('Erreur PUT', err)
                return of(null)
            })
        )
    }

    /** DELETE — supprime un élément */
    delete(endpoint: string, id: string): Observable<boolean> {
        return this.http.delete<Result<boolean>>(`${this.baseUrl}/${endpoint}/${id}`).pipe(
            map(res => !!res.Content),
            catchError((err: HttpErrorResponse) => {
                console.error('Erreur DELETE', err)
                return of(false)
            })
        )
    }
}
