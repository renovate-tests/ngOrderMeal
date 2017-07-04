import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodayListComponent } from "./today-list.component";
import { TodayAddComponent } from "./today-add.component";
import { TodayBeforeComponent } from "./today-before.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';


const routes = [
  { path: "", component: TodayListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  declarations: [
    TodayListComponent,
    TodayAddComponent,
    TodayBeforeComponent,
  ]
})
export class TodayModule { }
