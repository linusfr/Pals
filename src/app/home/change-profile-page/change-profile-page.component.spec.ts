import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProfilePageComponent } from './change-profile-page.component';

describe('ChangeProfilePageComponent', () => {
  let component: ChangeProfilePageComponent;
  let fixture: ComponentFixture<ChangeProfilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeProfilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
