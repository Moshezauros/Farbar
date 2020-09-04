import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarbarComponent } from './farbar.component';

describe('FarbarComponent', () => {
  let component: FarbarComponent;
  let fixture: ComponentFixture<FarbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
