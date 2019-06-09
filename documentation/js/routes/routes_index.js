var ROUTES_INDEX = {
  name: '<root>',
  kind: 'module',
  className: 'AppModule',
  children: [
    {
      name: 'routes',
      filename: 'src/app/app-routing/app-routing.module.ts',
      module: 'AppRoutingModule',
      children: [
        { path: '', component: 'HomeComponent' },
        { path: 'detailedClub/:id', component: 'DetailedViewComponent' },
        { path: 'editClub/:id', component: 'EditClubComponent' },
        { path: 'createClub', component: 'CreateClubComponent' },
        { path: 'joinedClubs', component: 'JoinedClubsComponent' },
        { path: 'profile', component: 'ProfilePageComponent' },
        { path: 'changeProfile', component: 'ChangeProfilePageComponent' },
        { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
        { path: 'chatLogin', component: 'ChatLoginComponent' },
        { path: 'chat', component: 'GroupViewComponent' }
      ],
      kind: 'module'
    },
    {
      name: 'routes',
      filename: 'src/app/auth/auth-routing.module.ts',
      module: 'AuthRoutingModule',
      children: [
        {
          path: 'auth',
          children: [
            { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
            { path: 'login', component: 'LoginComponent' },
            { path: 'register', component: 'RegisterComponent' }
          ]
        }
      ],
      kind: 'module'
    }
  ]
};
