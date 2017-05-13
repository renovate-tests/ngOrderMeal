import { Component, OnInit, ChangeDetectorRef, NgZone, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
declare var $: any;

@Component({
  selector: 'app-check-manage',
  templateUrl: './check-manage.component.html',
  styleUrls: ['./check-manage.component.css']
})
export class CheckManageComponent implements OnInit {
  form: FormGroup;
  items: FirebaseListObservable<any>;
  months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

  constructor(private _fb: FormBuilder,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private el: ElementRef,
    private router: Router) {

    this.form = this._fb.group({
      bcash: 0,
      topUp: 0,
      pay: 0,
      store: '',
      man: '',
      dateAt: ['', [Validators.required]],
      content: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(x => {
      this.Init(x);
      console.log(x);
    });

  }

  Init(x) {
    this.form.patchValue({ man: x.id });
    // this.form.patchValue({ dateAt: new Date().toLocaleDateString() });
    const itemObservable = this.db.list('/items');
    itemObservable.subscribe(y => {
      const maxItem = y.filter(z => z.man === x.id).getMaxItem();
      this.form.patchValue({ bcash: maxItem.bcash + maxItem.topUp - maxItem.pay });
    });


    this.ngZone.run(() => {
      const form = this.form;
      const months = this.months;
      $('#dateAt_css').calendar({
        type: 'date',
        today: true,
        initialDate: null,
        onChange: function (date, text, mode) {
          form.patchValue({ dateAt: date === undefined ? null : (date as Date).toLocaleDateString() });
          // return date !== undefined;
        },
        date: function (date, settings) {
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
        popupOptions: {
          position: 'bottom left',
          lastResort: 'bottom left',
          prefer: 'opposite',
          hideOnScroll: false
        },
      });
    });

  }

  check() {
    console.log(this.form.value);
    const itemObservable = this.db.list('/items');
    itemObservable.push(this.form.value);
    this.router.navigate(['/list-firebase']);
  }

  timechange() {
    console.log('timechange');
  }

}
