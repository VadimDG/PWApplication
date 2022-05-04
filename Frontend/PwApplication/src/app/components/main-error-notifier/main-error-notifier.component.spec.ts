import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainErrorNotifierComponent } from './main-error-notifier.component';

describe('MainErrorNotifierComponent', () => {
  let component: MainErrorNotifierComponent;
  let fixture: ComponentFixture<MainErrorNotifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainErrorNotifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainErrorNotifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
