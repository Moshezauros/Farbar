import { Component, OnInit, Input } from '@angular/core';

export class TabItem {
  title: string;
  open: boolean;
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.less']
})
export class AccordionComponent implements OnInit {

  @Input()
  tabs: TabItem[];

  constructor() {
    this.tabs = [
      { title: 'sup', open: false },
      { title: 'sup1', open: false },
      { title: 'sup2', open: false },
      { title: 'sup3', open: false },
    ];
  }

  ngOnInit(): void {
  }

}
