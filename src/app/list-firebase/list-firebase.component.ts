import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';


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

  constructor(db: AngularFireDatabase, private cdRef: ChangeDetectorRef) {
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
  }

  /* 臨時查詢撰寫查詢的時間範圍 */
  getDates(): void {
    this.dates = [];
    for (let index = 0; index < 20; index++) {
      const dat = new Date('2017-1-1');
      dat.setDate(dat.getDate() + index);
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