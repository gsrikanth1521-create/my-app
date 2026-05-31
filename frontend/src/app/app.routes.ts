import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./app').then(m => m.App)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard').then(m => m.Dashboard)
    },
    {
        path: 'products',
        loadComponent: () => import('./components/products/products').then(m => m.Products)
    },
    {
        path: 'nestedformgroup',
        loadComponent: () => import('./components/nested-form-component/nested-form-component').then(m => m.NestedFormComponent)
    }
]