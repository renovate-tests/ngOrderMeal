import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, NgZone
} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
declare var $: any;


@Component({
  selector: 'app-list-firebase',
  templateUrl: './list-firebase.component.html',
  styleUrls: ['./list-firebase.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ListFirebaseComponent implements OnInit, OnDestroy {
  arr: any[] = [];
  people: any[] = [];
  dates: Date[] = [];
  infodata: any;
  items: FirebaseListObservable<any>;
  bcashs: object = {};
  unstb: Subscription;
  today: Date;
  today1: Date;
  beforeday = 20;
  permission = { insert: true, update: false, delete: false };
  isDetail = false;
  // sizeSubject: Subject<any>;

  constructor(db: AngularFireDatabase,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef) {

    // this.sizeSubject = new Subject();
    this.items = db.list('/items');
    // this.items = db.list('/items', {
    //   query: {
    //     orderByChild: 'man',
    //     equalTo: this.sizeSubject,
    //   }
    // });
  }

  ngOnInit() {
    this.today = new Date();
    // this.sizeSubject.next('王xx');
    // this.sizeSubject.next('賢麟');
    this.unstb = this.items.subscribe((x) => {
      this.arr = x;
      this.Init();

    });
  }
  Init() {
    const arr = this.arr;
    this.people = arr.map(x => x.man)
      .filter((v, i, a) => a.indexOf(v) === i);
    this.getDates();
  }

  /* 臨時查詢撰寫查詢的時間範圍 */
  getDates(): void {

    this.dates = [];
    for (let index = 0; index < this.beforeday; index++) {
      let dat: Date;
      dat = new Date(this.today.toDateString());
      dat.setDate(dat.getDate() - index);
      const week = dat.getDay();
      if (week === 0 || week === 6) { continue; }
      this.dates.push(dat);
    }
    // this.cdRef.reattach();
  }

  ngOnDestroy(): void {
    if (this.unstb !== null) {
      this.unstb.unsubscribe();
    }
  }
}