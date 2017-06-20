import { AngularFireDatabase } from 'angularfire2/database';
import {
  Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef,
  Output, EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ViewTableComponent implements OnInit, OnChanges {
  @Input() people: string[];
  @Input() dates: Date[];
  @Input() groupObj: any;
  @Input() permission = { insert: false, update: false, delete: false };
  @Input() isDetail = false;
  @Output() userUpdated = new EventEmitter();
  datapoint: any;
  bcashs = {};
  GetDate = (x: UserData) => Date.parse(x.dateAt);
  // tslint:disable-next-line:member-ordering
  MinItem: (x: any[]) => any = R.reduce(R.minBy(this.GetDate), Infinity);
  // tslint:disable-next-line:member-ordering
  MaxItem: (x: any[]) => any = R.reduce(R.maxBy(this.GetDate), 0);

  constructor(private cdRef: ChangeDetectorRef, private db: AngularFireDatabase) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.cdRef.reattach();
      this.getBcashs();
    }
    // console.log(changes);
  }

  getBcashs() {
    for (const value of this.people) {
      const item = this.groupObj[value].getMaxItem();
      this.bcashs[value] = item.bcash + item.topUp - item.pay;
    }
  }

  filterData(dat: Date, name): any {
    // console.log(dat.toLocaleDateString(), name);
    const arr = this.groupObj[name] as any[];
    const item = arr.find(x => Date.parse(x.dateAt) === dat.valueOf());
    this.datapoint = null;
    if (item != null && (item.topUp + item.pay > 0)) {
      const money = item.bcash + item.topUp - item.pay;
      this.datapoint = {
        'M': '$:' + money,
        'topUp': item.topUp,
        'pay': item.pay,
        'key': item.$key
      };
      this.bcashs[name] = item.bcash;
    } else {
      this.datapoint = { 'bcash': this.bcashs[name] };
    }
    return this.datapoint;
  }

  /*  取得單筆帳單  */
  getInfo(dat, name): any {
    let caldata = this.groupObj[name].filter(x =>  Date.parse(x.dateAt) <= dat.valueOf());

    // 取得查詢範圍內的第一筆資料，保留第一筆先前金額
    const minDateItem = (caldata as any[]).getMinItem();

    // 當前資料
    const infodata = caldata.find(x => Date.parse(x.dateAt) === dat.valueOf());

    // 查詢範圍內資料(不含當前資料)
    caldata = caldata.filter(x => Date.parse(x.dateAt) < dat.valueOf());
    console.group();
    console.log('查詢範圍第一筆之前剩餘金額:' + minDateItem.bcash);

    if (caldata.length > 0) {
      const topUps = caldata.map(x => Number(x.topUp)).reduce((x, y) => x + y);
      const pay = caldata.map(x => Number(x.pay)).reduce((x, y) => x + y);
      infodata.bcash = minDateItem.bcash + topUps - pay;
      console.log('查詢範圍儲值總合(不含今日):' + topUps);
      console.log('查詢範圍消費總合(不含今日):' + pay);
    } else {
      infodata.bcash = minDateItem.bcash;
    }
    console.groupEnd();
    this.userUpdated.emit(infodata);
    this.cdRef.detach();
  }

  DeleteItem(key: any) {
    if (key != null && key !== '') {
      this.db.list('/items').remove(key);
    }
  }
  trackByItem(index, item) {
    if (item instanceof Date) {
      item = item.toLocaleString();
    }
    return item;
  }

}
