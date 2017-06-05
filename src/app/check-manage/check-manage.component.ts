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
  queryObj: Params;
  insertArr: UserData[];
  bTopUp = 0;
  bPay = 0;
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
    this.route.queryParams.subscribe(x => {
      if (x && Object.keys(x).length > 0) {
        if (x.key) {
          this.db.object(`/items/${x.key}`).subscribe((y: UserData) => {
            this.form.patchValue(y);  // Update
            this.bTopUp = y.topUp;
            this.bPay = y.pay;
          });
        } else {
          this.Insert(x);
        }
      }
      this.queryObj = x;
      console.log(x);
    });

  }

  Insert(x: Params) {
    this.form.patchValue({ man: x.man });
    this.items = this.db.list('/items', { query: { orderByChild: 'man', equalTo: x.man } });
    this.items.subscribe((y: UserData[]) => {
      this.insertArr = y;
      const maxItem = y.getMaxItem();
      this.form.patchValue({ bcash: maxItem.bcash + maxItem.topUp - maxItem.pay });
    });
  }

  check() {
    // console.log(this.form.value);
    const data: UserData = this.form.value;
    const queryData = this.db.database.ref('items').orderByChild('man').equalTo(data.man);
    // const diff_val = (data.topUp - data.pay) - (this.bTopUp - this.bPay);
    const bcash_now = data.bcash + data.topUp - data.pay;

    queryData.on('value', snapshot => {
      const keys = [];
      const bcashs = [];
      snapshot.forEach((child) => {
        const val_dateAt = child.child('dateAt').val();
        const val_bcash = child.child('bcash').val() as number;
        const val_topUp = child.child('topUp').val() as number;
        const val_pay = child.child('pay').val() as number;
        if (Date.parse(val_dateAt) > Date.parse(data.dateAt)) {
          keys.push(child.key);
          bcashs.push(val_bcash + bcash_now);
        }
        return false;
      });
      keys.forEach((key, i) => {
        const itemObservable = this.db.object(`/items/${key}`);
        itemObservable.update(<UserData>{ bcash: bcashs[i] });
      });
    });
    // ================================================================
    if (this.queryObj.key) {
      const itemObservable = this.db.object(`/items/${this.queryObj.key}`);
      itemObservable.update(<UserData>{
        pay: data.pay,
        topUp: data.topUp,
        store: data.store,
        content: data.content
      });
    } else {
      const itemObservable = this.db.list('/items');
      itemObservable.push(data);
    }

    this.router.navigate(['/list-firebase']);
  }

  dateChange(value): void {
    // tslint:disable-next-line:curly
    if (!this.insertArr) return;
    const arr = this.insertArr.filter(z => Date.parse(z.dateAt) <= Date.parse(value));
    if (arr.length > 0) {
      const maxItem = arr.getMaxItem();
      this.form.patchValue({ bcash: maxItem.bcash + maxItem.topUp - maxItem.pay });
    } else {
      this.form.patchValue({ bcash: 0 });
    }
  }
  getDate($event: any) {
    if ($event && this.queryObj.key) {
      this.form.patchValue({ dateAt: $event.toLocaleDateString() })
    }
  }

}
