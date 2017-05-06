import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '訂餐資訊';
  arr: any = [];
  people: any[] = [];

  constructor() {

  }

  ngOnInit(): void {
    fetch('../assets/data.json', { method: 'Get' })
      .then((obj) => obj.json())
      .then((a) => this.arr = a)
      .then(() => this.name());
  }

  name() {
    const arr = this.arr as any[];
    // console.log((this.arr as any[])
    //   .sort(
    //   (a, b) => this.compare(a.man, b.man)
    //   ).map((x) => x.man)
    // );

    this.people = arr.map(x => x.man)
      .filter((v, i, a) => a.indexOf(v) === i);
  }

  get getDate(): any[] {
    const arr = [];
    for (let index = 0; index < 7; index++) {
      const dat = new Date('2017-1-1');
      dat.setDate(dat.getDate() + index);
      arr.push(dat.toLocaleDateString());
    }
    return arr;
  }

  get getName(): string[] {
    return this.people;
  }

  filterData(dat, name): any {
    const arr = this.arr as any[];

    // console.log(arr.map(x => x.man), arr.map(x => x.dateAt), name, dat);
    const item = arr.find(x => x.man === name && x.dateAt === dat);
    // return item == null ? '' : item.man;
    if (item != null) {
      const money = item.beforMoney + item.inputMoney - item.spanMoney;
      return { '目前現金': money };
    }

    return undefined;
  }

  compare(a, b) {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
  }
}
