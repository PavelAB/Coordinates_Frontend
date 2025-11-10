import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  
    public setItem = (key: string, value: string):void => {
        console.log("coucou", key, value);
        
        localStorage.setItem(key, value)
    }
    public getItem = (key: string): string | null => {
        return localStorage.getItem(key)
    }
    public removeItem = (key: string):void => {
        localStorage.removeItem(key)
    }
}
