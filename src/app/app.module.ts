import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CheckManageComponent } from './check-manage/check-manage.component';
import { ListFirebaseComponent } from './list-firebase/list-firebase.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DetailComponent } from './list-firebase/detail/detail.component';
import { ViewTableComponent } from './list-firebase/view-table/view-table.component';
import { DatePickerDirective } from './directive/date-picker.directive';


const firebase = {
  apiKey: 'AIzaSyC22dRy8lpaa7QHsfzO_BUWoR4MMVuofd8',
  authDomain: 'ordermeal-76bf4.firebaseapp.com',
  databaseURL: 'https://ordermeal-76bf4.firebaseio.com',
  projectId: 'ordermeal-76bf4',
  storageBucket: 'ordermeal-76bf4.appspot.com',
  messagingSenderId: '826319177185'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CheckManageComponent,
    ListFirebaseComponent,
    DetailComponent,
    ViewTableComponent,
    DatePickerDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
