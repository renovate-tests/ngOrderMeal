import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CallbackComponent } from './callback/callback.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'check-manage', loadChildren: 'app/check-manage/check-manage.module#CheckManageModule' },
    { path: 'list-firebase', loadChildren: 'app/list-firebase/history.module#HistoryModule' },
    { path: 'multi-insert', loadChildren: 'app/multi-insert/multi-insert.module#MultiInsertModule' },
    { path: 'today-list', loadChildren: 'app/today-list/today.module#TodayModule' },
    { path: 'callback', component: CallbackComponent },
    { path: '**', component: HomeComponent }
];
