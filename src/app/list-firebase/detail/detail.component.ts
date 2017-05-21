import {
  Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges
} from '@angular/core';
import { Method } from 'app/lib/method';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
