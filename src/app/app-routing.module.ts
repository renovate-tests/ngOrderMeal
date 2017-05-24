import { MultiInsertComponent } from './multi-insert/multi-insert.component';
import { CallbackComponent } from './callback/callback.component';
import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CheckManageComponent } from './check-manage/check-manage.component';
import { ListFirebaseComponent } from './list-firebase/list-firebase.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'check-manage', component: CheckManageComponent },
    { path: 'list-firebase', component: ListFirebaseComponent },
    { path: 'check-manage/:id', component: CheckManageComponent },
    { path: 'multi-insert', component: MultiInsertComponent },
    { path: 'callback', component: CallbackComponent },
    { path: '**', component: HomeComponent }
];