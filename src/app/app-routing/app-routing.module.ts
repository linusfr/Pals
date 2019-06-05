import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { GroupViewComponent } from '../chat/group-view/group-view.component';
import { ChatLoginComponent } from '../chat/chat-login/chat-login.component';

import { DetailedViewComponent } from '../home/detailed-view/detailed-view.component';
import { ProfilePageComponent } from '../home/profile-page/profile-page.component';
import { CreateClubComponent } from '../home/create-club/create-club.component';
import { ChangeProfilePageComponent } from '../home/change-profile-page/change-profile-page.component';
import { JoinedClubsComponent } from '../home/joined-clubs/joined-clubs.component';
import { EditClubComponent } from '../home/edit-club/edit-club.component';

const routes: Routes = [
  // originally we would start at home screen -> this only to test chat, comment back in after!

  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'detailedClub/:id',
    component: DetailedViewComponent
  },
  {
    path: 'editClub/:id',
    component: EditClubComponent
  },
  {
    path: 'createClub',
    component: CreateClubComponent
  },
  {
    path: 'joinedClubs',
    component: JoinedClubsComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  },
  {
    path: 'changeProfile',
    component: ChangeProfilePageComponent
  },
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  // { path: '', redirectTo: 'chat', pathMatch: 'full' }, // our home screen would also lead to the chat login field
   { path: 'chatLogin', component: ChatLoginComponent }, // would start at login screen, which we do not need --> 
  { path: 'chat', component: GroupViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})
export class AppRoutingModule {}
