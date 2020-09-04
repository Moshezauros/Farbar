import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, Subscription } from "rxjs";
import { $ } from 'protractor';

@Component({
  selector: 'app-farbar',
  templateUrl: './farbar.component.html',
  styleUrls: ['./farbar.component.less']
})
export class FarbarComponent implements OnInit {
  width: number;
  sidebarBorderStartPosition: number;
  resizeSubscription: Subscription;
  resizeObservable: Observable<Event>;
  mouseMovementObservable: Observable<Event>;
  mouseMoveSubscription: Subscription;
  showShadowVertical: boolean;
  shadowRight: number;

  constructor() {
    this.width = 150;
    this.resizeObservable = fromEvent(window, "mouseup");
    this.mouseMovementObservable = fromEvent(window, "mousemove");
  }

  ngOnInit(): void {
  }

  startResize($event: MouseEvent): void {
    $event.preventDefault();
    console.log("mousedown clicked");
    console.log(`current width: ${$event.clientX}`);
    this.sidebarBorderStartPosition = $event.clientX;


    // if (this.resizeSubscription && !this.resizeSubscription.closed) {
    //   return;
    // }
    this.resizeSubscription = this.resizeObservable
      .subscribe(res => this.setNewWidth(res as MouseEvent));
    // need to listen to two events - one for mouse up, to stop resizing and set new width,
    // and the second to update the poistion of the "shadow" vertical line
    this.mouseMoveSubscription = this.mouseMovementObservable
      .subscribe(($mouseMove) => this.shadowVertical($mouseMove as MouseEvent));
    this.showShadowVertical = true;
    this.shadowRight = 0;
  }

  setNewWidth($event: MouseEvent): void {
    if (!this.resizeSubscription) {
      return;
    }
    const newWidth = $event.clientX;

    const diff = this.sidebarBorderStartPosition - newWidth;
    this.width += diff;

    this.stopResize();
    console.log("done with setNewWidth");
  }

  private stopResize(): void {
    console.log('stopping resize');

    this.resizeSubscription.unsubscribe();
    this.resizeSubscription = null;
    this.mouseMoveSubscription.unsubscribe();
    this.mouseMoveSubscription = null;
    this.showShadowVertical = false;
  }

  shadowVertical($event: MouseEvent): void {
    $event.preventDefault();
    if ($event.button !== 0 || $event.buttons === 0) {
      this.stopResize();
    }
    this.shadowRight = this.sidebarBorderStartPosition - $event.clientX;
  }
}
