import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Method } from 'app/service/method';

@Component({
  selector: 'app-today-before',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<div class="ui four cards">
  <div *ngFor="let p of beforArr" class="ui card" style="min-width:345px">
    <div class="content">
      <i class="right floated left icon"></i>
      <div class="header">{{p.man}}
        <span style="margin-left:1em; color:green" *ngIf="p.ischeck">確認</span>
        <span style="margin-left:1em; color:grey" *ngIf="!p.ischeck">未確認</span>
      </div>
      <div class="description">
        {{"店家:"+p.store}}
        <br>
        <span style="color:red">{{"消費:"+p.pay}}</span>
        <br>
        <span style="color:green">{{"儲值:"+p.topUp}}</span>
        <br> {{"消費內容:"+ p.content}}
        <br>
        <br> {{"帳單日:"+p.dateAt }}
        <br> {{"建立時間:"+(getDateTime(p) )}}
      </div>
    </div>
  </div>
</div>`,
})
export class TodayBeforeComponent implements OnInit {
  @Input() beforArr = [];

  constructor() { }

  ngOnInit(): void {
  }

  getDateTime(item: any) {
    console.log(item);

    if (item && item.$key) {
      const dat = Method.GetFirebaseKeyTime(item.$key);
      return dat.toLocaleDateString() + ' ' + dat.toLocaleTimeString();
    }
    return '';
  }

}