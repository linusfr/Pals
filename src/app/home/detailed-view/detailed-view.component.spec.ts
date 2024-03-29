import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedViewComponent } from './detailed-view.component';
import { NgAddToCalendarModule } from '@trademe/ng-add-to-calendar';
import { CreateClubComponent } from '../create-club/create-club.component';

describe('DetailedViewComponent', () => {
  let component: DetailedViewComponent;
  let fixture: ComponentFixture<DetailedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgAddToCalendarModule],
      declarations: [DetailedViewComponent, CreateClubComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
