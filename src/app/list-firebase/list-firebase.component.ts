import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, NgZone
} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
declare var $: any;


@Component({
  selector: 'app-list-firebase',
  templateUrl: './list-firebase.component.html',
  styleUrls: ['./list-firebase.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ListFirebaseComponent implements OnInit, OnDestroy {
  arr: any = [];
  people: any[] = [];
  dates: Date[] = [];
  infodata: any;
  items: FirebaseListObservable<any>;
  bcashs: object = {};
  unstb: Subscription;
  today = new Date().toLocaleDateString();
  beforeday = 20;
  months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

  constructor(db: AngularFireDatabase,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef) {
    this.items = db.list('/items');
  }

  ngOnInit() {
    this.unstb = this.items.subscribe((x) => {
      this.arr = x;
      this.Init();
    });
  }
  Init() {
    const arr = this.arr as any[];
    this.people = arr.map(x => x.man)
      .filter((v, i, a) => a.indexOf(v) === i);
    this.getDates();

    for (const value of this.people) {
      this.bcashs[value] = arr.filter(x => x.man === value).getMinItem().bcash;
    }

    // this.ngZone.run(() => {
    //   const months = this.months;
    //   $('#dateAt_css').calendar({
    //     type: 'date',
    //     today: true,
    //     text: {
    //       days: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
    //       months: months,
    //       monthsShort: months,
    //       today: '今天',
    //       now: 'Now',
    //       am: 'AM',
    //       pm: 'PM'
    //     },
    //   });
    // });
  }

  /* 臨時查詢撰寫查詢的時間範圍 */
  getDates(): void {
    this.dates = [];
    for (let index = 0; index < this.beforeday; index++) {
      const dat = new Date(this.today);
      dat.setDate(dat.getDate() - index);
      const week = dat.getDay();
      if (week === 0 || week === 6) { continue; }
      this.dates.push(dat);
    }
  }

  ngOnDestroy(): void {
    if (this.unstb !== null) {
      this.unstb.unsubscribe();
    }
  }

  getInfoData(infodata) {
    this.infodata = infodata;
  }
}