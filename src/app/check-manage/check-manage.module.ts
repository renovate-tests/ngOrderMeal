import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckManageComponent } from './check-manage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePickerModule } from "../directive/directive.module";

const routes = [
  { path: '', component: CheckManageComponent },
  { path: ':id', component: CheckManageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DatePickerModule
  ],
  declarations: [
    // DatePickerDirective,
    CheckManageComponent
  ]
})
export class CheckManageModule { }
