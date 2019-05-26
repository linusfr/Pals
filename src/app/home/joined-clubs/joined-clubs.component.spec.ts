import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedClubsComponent } from './joined-clubs.component';

describe('JoinedClubsComponent', () => {
  let component: JoinedClubsComponent;
  let fixture: ComponentFixture<JoinedClubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedClubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
