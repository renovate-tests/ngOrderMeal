import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-table',
  templateUrl: './view-table.component.html',
  styleUrls: ['./view-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ViewTableComponent implements OnInit {

  @Input()
  people: string[];

  @Input()
  dates: Date[];

  @Input()
  arr: any[];

  @Input()
  bcashs: object;

  datapoint: any;
  @Output() userUpdated = new EventEmitter();

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  filterData(dat: Date, name): any {
    // console.log(dat.toLocaleDateString(), name);
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
    return this.datapoint;
  }

  /*  取得單筆帳單  */
  getInfo(dat, name): any {
    const arr = JSON.parse(JSON.stringify(this.arr)) as any[];
    let caldata = arr.filter(x => x.man === name && new Date(x.dateAt) <= dat);

    // 取得查詢範圍內的第一筆資料，保留第一筆先前金額
    const minDateItem = (caldata as any[]).getMinItem();

    // 當前資料
    const infodata = caldata.find(x => x.dateAt === dat.toLocaleDateString());

    // 查詢範圍內資料(不含當前資料)
    caldata = caldata.filter(x => new Date(x.dateAt) < dat);
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

}
