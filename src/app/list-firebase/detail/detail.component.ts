import {
  Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef,
  OnChanges, SimpleChanges, AfterContentInit, AfterViewChecked
} from '@angular/core';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DetailComponent implements OnInit, OnChanges, AfterContentInit, AfterViewChecked {



  @Input()
  infodata: any;

  constructor(private cdRef: ChangeDetectorRef) {
    // this.cdRef.markForCheck();
  }

  ngOnInit() {
    // setTimeout(() => { this.cdRef.markForCheck(); }, 1000);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('detail changes');
    console.log(changes);
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit');
  }
}
