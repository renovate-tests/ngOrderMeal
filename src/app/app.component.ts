import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '訂餐帳本';
  arr: any = [];
  people: any[] = [];
  infodata: any;
  caldata: any;

  constructor() {
  }

  ngOnInit(): void {
    fetch('../assets/data.json', { method: 'Get' })
      .then((obj) => obj.json())
      .then((a) => this.arr = a)
      .then(() => this.Init());
  }

  Init() {
    const arr = this.arr as any[];
    this.people = arr.map(x => x.man)
      .filter((v, i, a) => a.indexOf(v) === i);
  }

  get getDate(): any[] {
    const arr = [];
    for (let index = 0; index < 20; index++) {
      const dat = new Date('2017-1-1');
      dat.setDate(dat.getDate() + index);
      const week = dat.getDay();
      if (week === 0 || week === 6) { continue; }
      arr.push(dat);
    }
    return arr;
  }

  get getName(): string[] {
    return this.people;
  }

  filterData(dat: Date, name): any {
    const arr = this.arr as any[];
    const item = arr.find(x => x.man === name && x.dateAt === dat.toLocaleDateString());

    if (item != null) {
      const money = item.beforMoney + item.inputMoney - item.spanMoney;
      return { 'M': '$:' + money };
    }
    return undefined;
  }
  getInfo(dat, name): any {
    const arr = this.arr as any[];

    this.caldata = arr.filter(x => x.man === name && new Date(x.dateAt) <= dat);
    this.infodata = this.caldata.find(x => x.dateAt === dat.toLocaleDateString());
    this.caldata = this.caldata.filter(x => new Date(x.dateAt) < dat);
    if (this.caldata.length > 0) {
      const inputMoneys = this.caldata.map(x => x.inputMoney).reduce((x, y) => x + y);
      const spanMoneys = this.caldata.map(x => x.spanMoney).reduce((x, y) => x + y);
      this.infodata.beforMoney = inputMoneys - spanMoneys;
      console.group();
      console.log('先前儲值總共:' + inputMoneys);
      console.log('先前消費總共:' + spanMoneys);
      console.groupEnd();
    } else {
      this.infodata.beforMoney = 0;
    }
  }

  compare(a, b) {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
  }
}
