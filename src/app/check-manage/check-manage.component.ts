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
          this.db.object(`/items/${x.key}`).subscribe(y => {
            // console.log(y);
            this.Update(y);
          });

        } else {
          this.Insert(x);
        }
      } else {
      }
      this.queryObj = x;
      console.log(x);
    });
  }

  Insert(x) {
    this.form.patchValue({ man: x.man });
    const itemObservable = this.db.list('/items', { query: { orderByChild: 'man', equalTo: x.man } });
    itemObservable.subscribe(y => {
      const maxItem = y.getMaxItem();
      this.form.patchValue({ bcash: maxItem.bcash + maxItem.topUp - maxItem.pay });
    });
  }

  Update(x) {
    this.form.patchValue({
      man: x.man,
      dateAt: x.dateAt,
      store: x.store,
      pay: x.pay,
      content: x.content,
      bcash: x.bcash,
      topUp: x.topUp
    });
  }

  check() {
    console.log(this.form.value);
    const itemObservable = this.db.list('/items');
    itemObservable.push(this.form.value);
    this.router.navigate(['/list-firebase']);
  }

}
