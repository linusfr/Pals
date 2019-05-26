import {
  async,
  ComponentFixture,
  TestBed,
  inject,
  tick,
  fakeAsync
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { TokenStorage } from '../auth/token.storage';
import { CreateClubComponent } from './create-club/create-club.component';
import { DetailedViewComponent } from './detailed-view/detailed-view.component';
import { NgAddToCalendarService } from '@trademe/ng-add-to-calendar';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [HomeComponent,CreateClubComponent,DetailedViewComponent],
      providers: [AuthService,TokenStorage,NgAddToCalendarService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
