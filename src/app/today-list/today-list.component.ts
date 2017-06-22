import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Method } from "app/service/method";

@Component({
  selector: 'app-today-list',
  templateUrl: './today-list.component.html',
  styleUrls: ['./today-list.component.css']
})
export class TodayListComponent implements OnInit {

  form: FormGroup;
  form1: FormGroup;
  addNew = false;
  todayArr = [];
  people = [];
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
    this.form = this._fb.group(this.defaultItem);
    this.form1 = this._fb.group(this.defaultItem);
  }

  ngOnInit() {
    this.db.list('/todayItems').subscribe(x => {
      this.todayArr = x;
      this.todayArr.forEach(z => {
        z.isedit = false;
        z.ischeck = false;
      })
    });
    this.db.list('/people').subscribe(x => {
      this.people = x;
      console.log(x);
    });

  }

  new_one() {
    this.addNew = true;
    this.form = this._fb.group(this.defaultItem);
    setTimeout(() => { $('#dropdown').dropdown({ fullTextSearch: true }); }, 0);
  }

  check() {
    console.log('check');
  }

  select(man) {
    this.form.patchValue({ man: man });
  }

  edit(key) {
    console.log('edit', key);
    this.todayArr.forEach(z => z.isedit = false);
    let item = this.todayArr.find(x => x.$key === key);
    item.isedit = true;
    this.form1.patchValue(item);
  }

  cancel() {
    console.log('cancel');
    this.todayArr.forEach(z => z.isedit = false);
  }

  add() {
    const new_data: UserData = this.form.value;
    console.log(new_data);
    this.db.list('/todayItems').push(new_data)
      .then(() => {
        this.addNew = false;
        console.log('新增成功');
      })
      .catch(() => { console.log('新增失敗'); });
    // 無此成員，增加成員
    if (!R.contains(new_data.man, this.people)) {
      this.db.list('/people').push(new_data.man);
    }
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
