import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CheckManageComponent } from './check-manage/check-manage.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { ListFirebaseComponent } from './list-firebase/list-firebase.component';

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
    ListFirebaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
