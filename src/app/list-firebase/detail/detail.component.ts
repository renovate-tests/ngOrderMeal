import {
  Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges
} from '@angular/core';
import { Method } from '../../service/method';

@Component({
  selector: 'app-detail',
  // templateUrl: './detail.component.html',
  // styleUrls: ['./detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <span *ngIf="infodata">
  <b>單筆明細:</b> <br>
  {{"先前金額:"+infodata.bcash}}
  <br >
  <span style="color:red">
  {{"今日消費:"+infodata.pay}}
  </span>
  <br>
  <span style="color:green">
  {{"今日儲值:"+infodata.topUp}}
  </span>
  <br> {{"店家:"+infodata.store}}
  <br> {{"消費內容:"+ infodata.content}}
  <br> {{"消費者:"+ infodata.man}}
  <br> {{"時間:"+infodata.dateAt}}
  <br> {{"目前金額:"+(infodata.bcash +infodata.topUp-infodata.pay )}}
  <br> {{"建立時間:"+(getDateTime() )}}
  </span>
  `
})
export class DetailComponent implements OnInit, OnChanges {

  @Input()
  infodata: any;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.infodata ? this.infodata.$key : 'no key');
  }

  getDateTime() {
    if (this.infodata && this.infodata.$key) {
      const dat = Method.GetFirebaseKeyTime(this.infodata.$key);
      return dat.toLocaleDateString() + ' ' + dat.toLocaleTimeString();
    }
    return '';

  }
}
