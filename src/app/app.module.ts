import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { ProfilePageComponent } from './home/profile-page/profile-page.component';
import { ChangeProfilePageComponent } from './home/change-profile-page/change-profile-page.component';

// MATERIAL IMPORTS THROUGH THIS
import { MaterialModule } from './material/material';

// OWN COMPONENTS
import { DetailedViewComponent } from './home/detailed-view/detailed-view.component';
import { CreateClubComponent } from './home/create-club/create-club.component';

// OWN SERVICES
import { ClubService } from './services/club.service';
import { UserService } from './services/user.service';

// GOOGLE CALENDAR EXPORT 
import { NgAddToCalendarModule } from '@trademe/ng-add-to-calendar';
import { AuthService } from './auth/auth.service';
import { TokenStorage } from './auth/token.storage';

// CHAT
import { GroupViewComponent } from './chat/group-view/group-view.component';
import { ChatLoginComponent } from './chat/chat-login/chat-login.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DetailedViewComponent,
    CreateClubComponent,
    GroupViewComponent,
    ChatLoginComponent,
    ProfilePageComponent,
    ChangeProfilePageComponent,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    AuthModule,
    AdminModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    NgAddToCalendarModule
  ],
  providers: [
    ClubService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchErrorInterceptor,
      multi: true
    }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
