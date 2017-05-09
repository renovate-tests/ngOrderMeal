import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-check-manage',
  templateUrl: './check-manage.component.html',
  styleUrls: ['./check-manage.component.css']
})
export class CheckManageComponent implements OnInit {
  form;
  items: FirebaseListObservable<any>;

  constructor(private _fb: FormBuilder, private db: AngularFireDatabase) {
    this.form = this._fb.group({
      bcash: 0,
      topUp: 0,
      pay: 0,
      store: '',
      man: '',
      dateAt: '',
      content: ''
    });

    // this.items = db.list('/items');
  }

  ngOnInit() {

    // console.log(this.form.value);
  }

  check() {
    console.log(this.form.value);
    const itemObservable = this.db.list('/items');
    itemObservable.push(this.form.value);

  }

}
