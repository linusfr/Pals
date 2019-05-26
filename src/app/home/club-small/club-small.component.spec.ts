import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubSmallComponent } from './club-small.component';

describe('ClubSmallComponent', () => {
  let component: ClubSmallComponent;
  let fixture: ComponentFixture<ClubSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
