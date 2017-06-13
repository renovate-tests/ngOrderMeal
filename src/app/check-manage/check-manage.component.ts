import { Store } from '@ngrx/store';
import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-check-manage',
  templateUrl: './check-manage.component.html',
  styleUrls: ['./check-manage.component.css']
})
export class CheckManageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  items: FirebaseListObservable<any>;
  queryObj: UserData;
  // insertArr: UserData[];
  manArr: UserData[];
  key: any = null;

  constructor(private _fb: FormBuilder,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private store: Store<any>,
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
    this.route.queryParams.subscribe(param => {
      if (param && Object.keys(param).length > 0) {
        // 在新增新人時需要調整
        this.store.dispatch({
          type: 'GETDATA', payload: { man: param.man }
        });
        const unsub = this.store.select(state => state.order).subscribe(x => {
          // tslint:disable-next-line:curly
          if (!x.manArr) return;
          this.manArr = x.manArr;
          if (param.key) {
            this.key = param.key;
            this.queryObj = R.find(z => z.$key === this.key)(x.manArr);
            this.form.patchValue(this.queryObj);
          } else {
            this.queryObj = <UserData>{ man: param.man, topUp: 0, pay: 0 };
            this.form.patchValue({ man: param.man });
          }
          this.SetBcash();
          if (unsub) {
            unsub.unsubscribe();
          }
        });
      }
    });
  }

  check() {
    const new_data: UserData = this.form.value;
    const old_data = <UserData>this.queryObj;
    const GetDate = R.compose(Date.parse, R.prop('dateAt'));
    const Condition = R.converge(R.gt)([GetDate, R.always(GetDate(new_data))]);
    const after_datas = R.filter(Condition)(this.manArr);
    const diff_value = (new_data.topUp - new_data.pay) - (old_data.topUp - old_data.pay);
    const items = this.db.list('/items');
    // 修改金額之後的金額的修改
    if (diff_value !== 0) {
      const updateData1 = (a: UserData, b) => {
        items.update(`${b.$key}`, { bcash: a.bcash + a.topUp - a.pay });
        return b;
      };
      R.reduce(updateData1, new_data)(after_datas);
    }
    // 當前資料新增與修改
    if (this.isInsert) {
      items.push(new_data);
    } else {
      items.update(`${this.key}`, new_data);
    }
    this.router.navigate(['/list-firebase']);
  }

  getDate($event: any) {
    if ($event) {
      this.form.patchValue({ dateAt: $event.toLocaleDateString() });
    }
    this.SetBcash();
  }

  SetBcash() {
    // tslint:disable-next-line:curly
    if (!this.manArr) return;
    const GetDate = R.compose(Date.parse, R.prop('dateAt'));
    const Condition = R.converge(R.lt, [GetDate, R.always(Date.parse(this.form.value.dateAt))]);
    const item = R.find(Condition)(R.reverse(this.manArr));
    if (item) {
      this.form.patchValue({ bcash: item.bcash + item.topUp - item.pay });
    } else {
      this.form.patchValue({ bcash: 0 });
    }
  }

  public get isInsert(): boolean {
    return this.key === null;
  }
  public get isExist(): boolean {
    // tslint:disable-next-line:curly
    if (!this.manArr) return false;
    const arr = this.isInsert ? this.manArr : this.manArr.filter((x: any) => x.$key !== this.key);
    return R.contains(this.form.value.dateAt)(R.map(x => x.dateAt)(arr));
  }


  ngOnDestroy(): void {
  }

}
