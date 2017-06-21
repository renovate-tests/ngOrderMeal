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
  addNew: false;
  todayArr = [];

  constructor(private db: AngularFireDatabase,
    private _fb: FormBuilder,
  ) {
    this.form = this._fb.group({
      topUp: 0,
      pay: 0,
      store: '',
      man: '',
      content: ''
    });
  }

  ngOnInit() {
    this.db.list('/todayItems').subscribe(x => {
      this.todayArr = x;
      console.log(x);
    });
  }


  add() {
    const new_data: UserData = this.form.value;
    console.log(new_data);
    const items = this.db.list('/todayItems');
    items.push(new_data);
    this.addNew = false;
  }

  getDateTime(item: any) {
    if (item && item.$key) {
      const dat = Method.GetFirebaseKeyTime(item.$key);
      return dat.toLocaleDateString() + ' ' + dat.toLocaleTimeString();
    }
    return '';

  }

}
