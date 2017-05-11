import { Component, OnInit } from '@angular/core';

declare global {
  interface Array<T> {
    getMinItem(): any;
    getMaxItem(): any;
  }
}

Array.prototype.getMinItem = function (): any {
  return (this as any[]).reduce((x, y) =>
    new Date(x.dateAt) < new Date(y.dateAt) ? x : y);
}

Array.prototype.getMaxItem = function (): any {
  return (this as any[]).reduce((x, y) =>
    new Date(x.dateAt) > new Date(y.dateAt) ? x : y);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '訂餐帳本';

  constructor() {
  }

  ngOnInit(): void {
  }

}
