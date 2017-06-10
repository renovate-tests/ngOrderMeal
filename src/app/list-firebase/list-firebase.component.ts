import { Observable } from 'rxjs/Observable';
import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

declare var $: any;

@Component({
  selector: 'app-list-firebase',
  templateUrl: './list-firebase.component.html',
  styleUrls: ['./list-firebase.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ListFirebaseComponent implements OnInit {
  people: any[] = [];
  dates: Date[] = [];
  infodata: any;
  queryDate: Date;
  beforeday = 20;
  permission = { insert: true, update: false, delete: false };
  isDetail = false;
  order: Observable<any>;
  groupObj: any;

  constructor(
    private store: Store<any>,
    private cdRef: ChangeDetectorRef) {

    this.order = store.select(state => state.order);
    store.dispatch({ type: 'QUERY' });
  }

  ngOnInit() {
    this.queryDate = new Date();
    const unstb = this.order.subscribe((x: any) => {
      console.log(x);
      // tslint:disable-next-line:curly
      if (!x || x.groupObj === null) return;
      this.people = x.peoples;
      this.groupObj = x.groupObj;
      this.getDates();

      if (unstb) {
        unstb.unsubscribe();
      }
    });
  }

  /* 臨時查詢撰寫查詢的時間範圍 */
  getDates(): void {
    this.dates = [];
    for (let index = 0; index < this.beforeday; index++) {
      let dat: Date;
      dat = new Date(this.queryDate.toDateString());
      dat.setDate(dat.getDate() - index);
      const week = dat.getDay();
      if (week === 0 || week === 6) { continue; }
      this.dates.push(dat);
    }
    // this.cdRef.reattach();
  }

  permissionChange(obj_chagne): void {
    this.permission = Object.assign({}, this.permission, obj_chagne);
  }
}