import { Routes } from "@angular/router";

export const dashboardRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard.cmp').then(m => m.DashboardComponent),
    }
];