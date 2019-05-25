import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material';
import { AuthService } from '../auth/auth.service';
import { TokenStorage } from '../auth/token.storage';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { HomeComponent } from '../home/home.component';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppRoutingModule,MaterialModule,HttpClientModule],
      providers: [AuthService,TokenStorage],
      declarations: [HeaderComponent,HomeComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
