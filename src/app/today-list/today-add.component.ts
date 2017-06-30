import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Method } from 'app/service/method';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AngularFireDatabase } from "angularfire2/database";
import { ani } from './../service/animate';
import { TodayListComponent } from "app/today-list/today-list.component";
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'app-today-add',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ['.star::after {content: " *"; color: red}'],
  animations: ani,
  template: `
  <div class="flex-row-header" style="margin-top:-1px">
  <button *ngIf="!addNew" [@plusAnimation] style="margin-top:10px;margin-right:2em;height:36px" class="circular ui icon button shadow"
    (click)="new_one()">
      <i class="plus icon"></i>
  </button>
  <div class="block_content"  *ngIf="addNew" [@outerAnimation]>
    <div class="ui card shadow insert" style="width:388px" [@enterAnimation]>
      <div class="content" [formGroup]="form"  [@contentAnimation]>
        <i class="right floated left icon"></i>
        <label class="ui orange  right ribbon label" style="font-size:100%" >新增今日帳單</label>
        <div class="description" style="margin-top: 4px">
          <div class="ui rigth labeled input">
            <input type="text" id="man_i" placeholder="消費者" formControlName="man">
            <label class="ui tag label" for="man_i"><span class="star">消費者</span></label>
          </div>
          <div id="dropdown1" class="ui dropdown search icon">
            <i class="user icon"></i>
            <div class="menu" style="max-height: 25em;">
              <div class="ui search icon input" *ngIf="peopleDiff.length > 9">
                <i class="search icon"></i>
                <input type="text" name="search" placeholder="查詢...">
              </div>
              <div class="item" (click)="select(m)" *ngFor="let m of peopleDiff">{{m}}</div>
            </div>
          </div>
          <div class="ui rigth labeled input">
            <input type="number" min="0" id="pay_i" placeholder="消費" style="color:red" formControlName="pay">
            <label class="ui tag label" for="pay_i" style="color:red"><span class="triangle">消費</span></label>
          </div>
          <div class="ui rigth labeled input">
            <input type="number" min="0" id="topUp_i" placeholder="儲值" style="color:green" formControlName="topUp">
            <label class="ui tag label" for="topUp_i" style="color:green"><span class="triangle">儲值</span></label>
          </div>
          <div class="ui rigth labeled input">
            <input type="text" id="store_i" placeholder="店家" formControlName="store">
            <label class="ui tag label" for="store_i">店家</label>
          </div>
          <div class="ui reply form">
            <div class="field">
              <textarea rows="3" formControlName="content" placeholder="消費內容"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="extra content" style="display:flex;justify-content:space-between" [@contentAnimation]>
        <button class="ui labeled icon button" (click)="addNew = false">
          <i class="arrow left icon"></i>取消
        </button>
        <button class="ui labeled icon button" style="margin-left: auto" (click)="add()" [ngClass]="{'disabled' : (form.value.topUp + form.value.pay) === 0 || form.value.man === '' || hasSameMan }">
          <i class="checkmark icon"></i>
          <span style="color:red" *ngIf="hasSameMan">今日已新增</span>
          <span *ngIf="!hasSameMan">確認</span>
        </button>
      </div>
    </div>
  </div>
</div>
`,
})
export class TodayAddComponent implements OnInit {
  @Input() peopleDiff = [];
  @Input() people = [];
  @Input() todayArr = [];
  form: FormGroup;
  addNewValue = false;
  hasSameMan = false;

  @Input()
  get addNew() {
    return this.addNewValue;
  }
  @Output() addNewChange = new EventEmitter();
  set addNew(val) {
    this.addNewValue = val;
    this.addNewChange.emit(this.addNewValue);
  }

  constructor(
    private db: AngularFireDatabase,
    private _fb: FormBuilder,
  ) {
    this.form = this._fb.group(TodayListComponent.defaultItem);
  }

  ngOnInit(): void {
  }

  new_one() {
    this.addNew = true;
    this.form = this._fb.group(TodayListComponent.defaultItem);
    this.peopleDiff = R.difference(this.people.map(x => x.man), this.todayArr.map(x => x.man));

    setTimeout(() => {
      $('div#dropdown1').dropdown({ fullTextSearch: true });
    }, 0);

    this.form.controls.man.valueChanges.subscribe((x) => {
      this.hasSameMan = R.contains(x, this.todayArr.map(y => y.man))
    })
  }

  add() {
    // tslint:disable-next-line:prefer-const
    let new_data: UserData = this.form.value;
    new_data.dateAt = new Date().toLocaleDateString();
    (<any>new_data).ischeck = false;

    console.table(this.people);
    console.log(new_data.man);

    // 無此成員，增加成員
    if (!R.contains(new_data.man, this.people.map(x => x.man))) {
      this.db.list('/people').push({ man: new_data.man, bcash: 0 });
    }

    this.db.list('/todayItems').push(new_data)
      .then(() => { console.log('新增成功'); })
      .catch(() => { console.log('新增失敗'); });

    this.addNew = false;
  }

  select(man) {
    this.form.patchValue({ man: man });
  }

}