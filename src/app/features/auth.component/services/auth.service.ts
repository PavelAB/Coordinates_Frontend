import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, effect, inject, Injectable, OnDestroy, signal } from '@angular/core';
import { environment } from 'environments/environment.development';
import { LoginForm } from '../models/LoginForm';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/LoginResponse';
import { Result } from '@shared/models/Result';
import { User } from '../models/User';
import { StorageService } from '@core/services/storage.service';

const BASE_URL = environment.API_URL
const TOKEN = "token"

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy{


    private readonly _http = inject(HttpClient) 
    private readonly _storage = inject(StorageService)
    private storageHandler = (event: StorageEvent) =>{
        if (event.key?.endsWith(TOKEN)) this._token.set(this._storage.getItem(TOKEN))
    }   

    public readonly response = signal< Result<User> | null>(null) 

    private _token = signal<string | null>(this._storage.getItem(TOKEN))
    private _user = signal<User | null>(null)

    readonly token = computed(() => this._token())
    readonly isAuthenticated = computed(() => !!this._token())
    readonly user = computed(() => this._user())
    

    constructor(){
        effect(() =>{
            const t = this._token()
            if(t) this._storage.setItem(TOKEN, t)
            else this._storage.removeItem(TOKEN)
        })
        effect(() => {
            console.log("token ==>", this.token())
            console.log("isAuthentificated ==>", this.isAuthenticated())
            console.log("user ==> ", this.user())            
        })


        window.addEventListener('storage', this.storageHandler)
    }
    
    ngOnDestroy(): void {
        window.removeEventListener('storage', this.storageHandler)
    }

    async init(){
        const t = this._storage.getItem(TOKEN)        
        if(t) this.checkUser()
    }


    public signIn( user: LoginForm ){
        
        if(!user || !user.login || !user.password ){
            user.login = "Bad2.1"
            user.password = "0000"
            // throw Error("Une erreur s’est produite : le formulaire de connexion n’est pas valide. Veuillez réessayer.")
        }
        
        this._http.post<Result<User>>(`${BASE_URL}/Auth`, user).subscribe({            
            next: (res: Result<User>) => { 
                this._token.set(res.Content?.Token!)
                
                this._user.set(res.Content!)                
            },
            error: (err: HttpErrorResponse) => {
                const backError = err.error as Result<User>

                this.response.set(backError)
            }
        })
    }
    public checkUser(){
        this._http.get<Result<User>>(`${BASE_URL}/Auth/GetConnectedUser`).subscribe({            
            next: (res: Result<User>) => {

                this._token.set(res.Content?.Token!)                
                this._user.set(res.Content!)                                     
            },
            error: (err: HttpErrorResponse) => {
                const backError = err.error as Result<User>
                this.response.set(backError)                
            }

        })
    }

    public signOut(){
        this._token.set(null)
        this._user.set(null)
    }
}



