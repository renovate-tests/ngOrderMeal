import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MultiInsertComponent } from "./multi-insert.component";
import { FormsModule } from "@angular/forms";


const routes = [
  { path: "", component: MultiInsertComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
  declarations: [MultiInsertComponent]
})
export class MultiInsertModule { }
