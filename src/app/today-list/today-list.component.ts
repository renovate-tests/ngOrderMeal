import { Component, OnInit } from '@angular/core';
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
  addNew: false;
  todayArr = [];

  constructor(private db: AngularFireDatabase,
    private _fb: FormBuilder,
  ) {
    let defaultItem = {
      topUp: 0,
      pay: 0,
      store: '',
      man: '',
      content: ''
    };
    this.form = this._fb.group(defaultItem);
    this.form1 = this._fb.group(defaultItem);
  }

  ngOnInit() {
    this.db.list('/todayItems').subscribe(x => {
      this.todayArr = x;

      this.todayArr.forEach(z => {
        z.isedit = false;
        z.ischeck = false;
      })
      // console.log(x);
    });
  }


  add() {
    const new_data: UserData = this.form.value;
    console.log(new_data);
    const items = this.db.list('/todayItems');
    items.push(new_data);
    this.addNew = false;
  }

  update(key) {
    const new_data: UserData = this.form1.value;
    console.log(new_data, key);
    const items = this.db.list('/todayItems');
    items.update(`${key}`, new_data);
    this.todayArr.forEach(z => z.isedit = false);
  }


  check() {
    console.log('check');
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

  remove(key) {
    console.log('remove', key);
    if (key != null && key !== '') {
      this.db.list('/todayItems').remove(key);
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
