import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ListFirebaseComponent } from "./list-firebase.component";
import { DetailComponent } from "./detail/detail.component";
import { ViewTableComponent } from "./view-table/view-table.component";
import { FormsModule } from "@angular/forms";

const routes = [
  { path: "", component: ListFirebaseComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ListFirebaseComponent,
    DetailComponent,
    ViewTableComponent,
  ]
})
export class HistoryModule { }
