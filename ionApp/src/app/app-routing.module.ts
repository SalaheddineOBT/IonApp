import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
    },
    {
        path: 'cars',
        loadChildren: () => import('./pages/cars/cars.module').then( m => m.CarsPageModule)
    },
    {
        path: 'intro',
        loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
    },
    {
        path: 'account',
        loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
    },
    {
        path: 'notifications',
        loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
    },
    {
        path: 'favorites',
        loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
    },
    {
        path: 'car-details/:id',
        loadChildren: () => import('./pages/car-details/car-details.module').then( m => m.CarDetailsPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
