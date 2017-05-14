import { FormGroup } from '@angular/forms';
import { Directive, ElementRef, NgZone, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Directive({
  selector: '[appDatePicker]'
})
export class DatePickerDirective implements OnInit, AfterViewInit {
  @Input() form: FormGroup;
  @Input() formDateName = 'dateAt';
  @Input() initDate;
  @Output() outputDate = new EventEmitter();

  months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

  constructor(
    private _elementRef: ElementRef,
    private _ngZone: NgZone
  ) { }

  ngAfterViewInit(): void {
    // const el = this._elementRef.nativeElement;
    // console.log(el);
  }
  ngOnInit(): void {

    const el = this._elementRef.nativeElement;
    const months = this.months;
    const form = this.form;
    const controlName = this.formDateName;
    const outputDate = this.outputDate;
    $(el).calendar({
      type: 'date',
      today: true,
      initialDate: null,
      onChange: function (date, text, mode) {
        outputDate.emit(date);
        if (Date.parse(text) === NaN) {
          $(el).calendar('clear');
        }
      },
      parser: {
        date: function (text, settings) {
        }
      },
      text: {
        days: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
        months: months,
        monthsShort: months,
        today: '今天',
        now: 'Now',
        am: 'AM',
        pm: 'PM'
      },
      formatter: {
        date: function (date, settings) {
          if (!date) {
            return '';
          }
          if (settings.type === 'date') {
            return (date as Date).toLocaleDateString();
          } else {
            const day = date.getDate();
            const month = settings.text.months[date.getMonth()];
            const year = date.getFullYear();
            return settings.type === 'year' ? year :
              settings.type === 'month' ? month + ' ' + year :
                (settings.monthFirst ? month + ' ' + day : day + ' ' + month) + ', ' + year;
          }
        }
      }
    });
    this.initDate = new Date();
    $(el).calendar('set date', new Date(this.initDate));
  }



}
