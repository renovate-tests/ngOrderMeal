import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { DatePickerDirective } from "./date-picker.directive";

@NgModule({
  // imports: [
  //   CommonModule
  // ],
  declarations: [DatePickerDirective],
  exports: [DatePickerDirective]
})
export class DatePickerModule { }
