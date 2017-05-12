import {
  Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit {
  @Input()
  infodata: any;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
  }
}
