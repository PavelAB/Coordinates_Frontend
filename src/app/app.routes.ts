import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('@features/home.component/home.component').then(c => c.HomeComponent),
        title: 'Home'
    },
    {
        path: 'map',
        loadComponent: () => import('@features/map.component/map.component').then(c => c.MapComponent),
        title: 'Coordinates'
    }
];
