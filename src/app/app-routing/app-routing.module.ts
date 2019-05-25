import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard.service';
import { HomeComponent } from '../home/home.component';
import { ProfilePageComponent } from '../home/profile-page/profile-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent
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
