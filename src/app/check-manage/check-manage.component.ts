import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-check-manage',
  templateUrl: './check-manage.component.html',
  styleUrls: ['./check-manage.component.css']
})
export class CheckManageComponent implements OnInit {
  form: FormGroup;
  items: FirebaseListObservable<any>;

  constructor(private _fb: FormBuilder, private db: AngularFireDatabase, private route: ActivatedRoute, private router: Router) {

    this.form = this._fb.group({
      bcash: 0,
      topUp: 0,
      pay: 0,
      store: '',
      man: '',
      dateAt: '',
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
    const itemObservable = this.db.list('/items');
    itemObservable.subscribe(y => {

      const maxItem = y.filter(z => z.man === x.id).getMaxItem();
      this.form.patchValue({ bcash: maxItem.bcash + maxItem.topUp - maxItem.pay });
    });
  }

  check() {
    console.log(this.form.value);
    const itemObservable = this.db.list('/items');
    itemObservable.push(this.form.value);
    this.router.navigate(['/list-firebase']);
  }

}
