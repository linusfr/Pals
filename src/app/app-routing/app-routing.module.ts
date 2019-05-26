import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { DetailedViewComponent } from '../home/detailed-view/detailed-view.component';
import { ProfilePageComponent } from '../home/profile-page/profile-page.component';
import { CreateClubComponent } from '../home/create-club/create-club.component';
import { ChangeProfilePageComponent } from '../home/change-profile-page/change-profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'detailedClub/:id',
    component: DetailedViewComponent
  },
  {
    path: 'createClub',
    component: CreateClubComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})
export class AppRoutingModule {}
