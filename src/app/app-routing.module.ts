import { MultiInsertComponent } from './multi-insert/multi-insert.component';
import { CallbackComponent } from './callback/callback.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CheckManageComponent } from './check-manage/check-manage.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'check-manage', component: CheckManageComponent },
    { path: 'check-manage/:id', component: CheckManageComponent },
    { path: "list-firebase", loadChildren: "app/list-firebase/history.module#HistoryModule" },
    { path: 'multi-insert', loadChildren: "app/multi-insert/multi-insert.module#MultiInsertModule" },
    { path: "today-list", loadChildren: "app/today-list/today.module#TodayModule" },
    { path: 'callback', component: CallbackComponent },
    { path: '**', component: HomeComponent }
    // { path: 'list-firebase', component: ListFirebaseComponent },
    // { path: 'multi-insert', component: MultiInsertComponent },
    // { path: 'today-list', component: TodayListComponent },
];