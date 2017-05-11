import {
  Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef,
  AfterViewInit, AfterContentInit, OnChanges, SimpleChanges, AfterContentChecked, AfterViewChecked
} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-list-firebase',
  templateUrl: './list-firebase.component.html',
  styleUrls: ['./list-firebase.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListFirebaseComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit, OnChanges, AfterContentChecked, AfterViewChecked {

  arr: any = [];
  people: any[] = [];
  dates: Date[] = [];
  infodata: any;
  caldata: any;
  datapoint: any;
  items: FirebaseListObservable<any>;
  // otherdata: Map<string, number>;
  bcashs: object = {};
  unstb: Subscription;

  constructor(db: AngularFireDatabase, private cdRef: ChangeDetectorRef) {
    this.items = db.list('/items');
    // this.cdRef.markForCheck();

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
    this.cdRef.markForCheck();
  }

  ngAfterViewInit(): void {
    // this.cdRef.detach();
    console.log('list ngafterviewinit');
  }

  ngAfterContentInit(): void {
    console.log('list ngAfterContentInit');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngAfterContentChecked(): void {
    console.log('list ngAfterContentChecked');
    // this.cdRef.detectChanges();

  }

  ngAfterViewChecked(): void {
    console.log('list ngAfterViewChecked');
    // this.cdRef.detach();
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

  /*  取得表格目前現金  */
  filterData(dat: Date, name): any {
    console.log(dat.toLocaleDateString(), name);

    const arr = this.arr as any[];
    const item = arr.find(x => x.man === name && x.dateAt === dat.toLocaleDateString());
    this.datapoint = null;
    if (item != null && (item.topUp + item.pay > 0)) {
      const money = item.bcash + item.topUp - item.pay;
      this.datapoint = {
        'M': '$:' + money,
        'topUp': item.topUp,
        'pay': item.pay
      };
      this.bcashs[name] = money;
    } else {
      this.datapoint = { 'bcash': this.bcashs[name] };
    }
    //  this.cdRef.reattach();
    return this.datapoint;
  }

  /*  取得單筆帳單  */
  getInfo(dat, name): any {
    // const arr = this.arr as any[];
    const arr = JSON.parse(JSON.stringify(this.arr)) as any[];
    this.caldata = arr.filter(x => x.man === name && new Date(x.dateAt) <= dat);

    // 取得查詢範圍內的第一筆資料，保留第一筆先前金額
    const minDateItem = (this.caldata as any[]).getMinItem();

    // 當前資料
    this.infodata = this.caldata.find(x => x.dateAt === dat.toLocaleDateString());

    // 查詢範圍內資料(不含當前資料)
    this.caldata = this.caldata.filter(x => new Date(x.dateAt) < dat);
    console.group();
    console.log('查詢範圍第一筆之前剩餘金額:' + minDateItem.bcash);

    if (this.caldata.length > 0) {
      const topUps = this.caldata.map(x => x.topUp).reduce((x, y) => x + y);
      const pay = this.caldata.map(x => x.pay).reduce((x, y) => x + y);
      this.infodata.bcash = minDateItem.bcash + topUps - pay;
      console.log('查詢範圍儲值總合(不含今日):' + topUps);
      console.log('查詢範圍消費總合(不含今日):' + pay);
    } else {
      this.infodata.bcash = minDateItem.bcash;
    }
    console.groupEnd();

  }

  ngOnDestroy(): void {
    if (this.unstb !== null) {
      this.unstb.unsubscribe();
    }
  }
}