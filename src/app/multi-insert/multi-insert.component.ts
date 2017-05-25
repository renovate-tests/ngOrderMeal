import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-insert',
  templateUrl: './multi-insert.component.html',
  styleUrls: ['./multi-insert.component.css']
})
export class MultiInsertComponent implements OnInit {

  text = '';
  output = [];

  constructor() { }

  ngOnInit() {
    // console.log(this.text);
  }

  onchange(a: string): void {
    const arr = a.split('\n');
    for (const value of arr) {
      const aaa = value.split('\t');
      if (aaa.length >= 3) {
        this.output.push({
          '消費者': aaa[0],
          '商品': aaa[1],
          '價格': aaa[2]
        });
      }
    }
  }

}
