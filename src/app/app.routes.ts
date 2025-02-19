import { Routes } from '@angular/router';

import { GuideComponent } from 'app/pages/home/home.component';
import { GuideDetailsComponent } from 'app/pages/details-create-pages/show-details-form/show-details.component';
import { AuthorizationComponent } from 'app/pages/auth-reg-pages/authorization/authorization.component';
import { UserPageComponent } from 'app/pages/user/user.component';
import { RegistrationComponent } from 'app/pages/auth-reg-pages/registration/registration.component';
import { CreateGuideComponent } from 'app/pages/details-create-pages/create-guide/create-guide.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'guides',
    component: GuideComponent,
    title: 'Home page',
  },
  {
    path: 'guides/add',
    component: CreateGuideComponent,
    canActivate: [authGuard],
    title: 'Create a guide',
  },
  {
    path: 'guides/:id',
    component: GuideDetailsComponent,
    title: 'Guide details',
  },

  {
    path: 'auth',
    component: AuthorizationComponent,
    title: 'Authorization',
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    title: 'Registration',
  },
  {
    path: ':username',
    component: UserPageComponent,
    canActivate: [authGuard],
    title: 'User page',
  },
  {
    path: '**',
    redirectTo: 'guides',
  },
];

export default routes;
