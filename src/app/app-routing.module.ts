import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CheckManageComponent } from './check-manage/check-manage.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'check-manage', component: CheckManageComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: false })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }