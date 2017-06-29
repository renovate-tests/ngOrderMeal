import { ani } from './../service/animate';
import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Method } from 'app/service/method';

@Component({
  selector: 'app-today-list',
  templateUrl: './today-list.component.html',
  styleUrls: ['./today-list.component.css'],
  animations: ani
})
export class TodayListComponent implements OnInit {
  form1: FormGroup;
  addNew = false;
  todayArr = [];
  beforArr = [];
  people = [];
  people_diff = [];
  today_timeout = new Date();
  today_num = 0;
  defaultItem = {
    topUp: 0,
    pay: 0,
    store: '',
    man: '',
    content: ''
  };

  constructor(private db: AngularFireDatabase,
    private _fb: FormBuilder,
    private ngZone: NgZone
  ) {
    // this.form = this._fb.group(this.defaultItem);
    this.form1 = this._fb.group(this.defaultItem);
    this.today_timeout.setHours(17);
    this.today_timeout.setMinutes(0);
    this.today_timeout.setSeconds(0);
    this.today_num = Date.parse(new Date().toLocaleDateString());
  }

  ngOnInit() {
    this.db.list('/todayItems').subscribe(x => {
      this.todayArr = x.filter(z => Date.parse(z.dateAt) === this.today_num);
      if (this.beforArr.length === 0) {
        this.beforArr = x.filter(z => Date.parse(z.dateAt) !== this.today_num);
      }
      this.todayArr.forEach(z => {
        z.isedit = false;
      });
    });
    this.db.list('/people').subscribe(x => {
      this.people = x;
      // console.table(x);
    });
  }

  getBcash(p) {
    const item = this.people.find(x => x.man === p.man);
    return item ? item.bcash : 0;
  }

  isTimeout(p): boolean {
    if (Date.parse(p.dateAt) === this.today_num) {
      return this.today_timeout < new Date();
    }
    return true;
  }

  edit(key) {
    console.log('edit', key);
    this.todayArr.forEach(z => z.isedit = false);
    // tslint:disable-next-line:prefer-const
    let item = this.todayArr.find(x => x.$key === key);
    item.isedit = true;
    this.form1.patchValue(item);
  }

  cancel() {
    console.log('cancel');
    this.todayArr.forEach(z => z.isedit = false);
  }

  check(a) {
    console.log('check');
    this.db.list('/todayItems').update(`${a.$key}`, { ischeck: true })
      .then(() => { console.log('確認成功'); })
      .catch(() => { console.log('確認失敗'); });

    const item = this.people.find(x => x.man === a.man);
    this.db.list('/people').update(`${item.$key}`, { bcash: item.bcash + a.topUp - a.pay, })
      .then(() => { console.log('bcash 確認成功'); })
      .catch(() => { console.log('bcash 確認失敗'); });
  }

  uncheck(a) {
    console.log('uncheck');
    this.db.list('/todayItems').update(`${a.$key}`, { ischeck: false })
      .then(() => { console.log('取消成功'); })
      .catch(() => { console.log('取消失敗'); });

    const item = this.people.find(x => x.man === a.man);
    this.db.list('/people').update(`${item.$key}`, { bcash: item.bcash - a.topUp + a.pay, })
      .then(() => { console.log('bcash 取消成功'); })
      .catch(() => { console.log('bcash 取消失敗'); });
  }

  update(key) {
    const new_data: UserData = this.form1.value;
    console.log(new_data, key);
    this.db.list('/todayItems').update(`${key}`, new_data)
      .then(() => {
        this.todayArr.forEach(z => z.isedit = false);
        console.log('修改成功');
      })
      .catch(() => { console.log('修改失敗'); });
  }

  remove(key) {
    console.log('remove', key);
    if (key != null && key !== '') {
      this.db.list('/todayItems').remove(key)
        .then(() => { console.log('刪除成功'); })
        .catch(() => { console.log('刪除失敗'); });
    }
  }

  getDateTime(item: any) {
    if (item && item.$key) {
      const dat = Method.GetFirebaseKeyTime(item.$key);
      return dat.toLocaleDateString() + ' ' + dat.toLocaleTimeString();
    }
    return '';

  }

}
