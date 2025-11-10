import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@features/home.component/home.component').then(c => c.HomeComponent),
        title: 'Coordinates'
    },
    {
        path: 'map',
        loadComponent: () => import('@features/map.component/map.component').then(c => c.MapComponent),
        title: 'Coordinates'
    },
    {
        path: 'profile',
        loadComponent: () => import('@features/profile.component/profile.component').then(c => c.ProfileComponent),
        title: 'Coordinates',
        canActivate: [authGuard]
    },
    {
        path: 'info',
        loadComponent: () => import('@features/info.component/info.component').then(c => c.InfoComponent),
        title: 'Coordinates'
    },
    {
        path: 'auth',
        loadComponent: () => import('@features/auth.component/auth.component').then(c => c.AuthComponent),
        title: 'Coordinates'
    },

];
