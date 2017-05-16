import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CheckManageComponent } from './check-manage/check-manage.component';
import { ListFirebaseComponent } from './list-firebase/list-firebase.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'check-manage', component: CheckManageComponent },
    { path: 'list-firebase', component: ListFirebaseComponent },
    // { path: 'check-manage/:id', component: CheckManageComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }