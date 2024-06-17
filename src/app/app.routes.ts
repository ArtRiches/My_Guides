import { Routes } from '@angular/router';

import { GuideComponent } from 'app/pages/home/home.component';
import { GuideDetailsComponent } from 'app/pages/details-create-pages/guide-details/guide-details.component';
import { AuthorizationComponent } from 'app/pages/auth-reg-pages/authorization/authorization.component'
import { UserPageComponent } from 'app/pages/user/user.component';
import { RegistrationComponent } from 'app/pages/auth-reg-pages/registration/registration.component';
import { CreateGuideComponent } from 'app/pages/details-create-pages/create-guide/create-guide.component';


export const routes: Routes = [
    {
        path: '',
        component: GuideComponent, 
        title: 'Home page',
    },
    {
        path: 'details/:id',
        component: GuideDetailsComponent,
        title: 'Guide details'
    },
    {
        path: 'auth',
        component: AuthorizationComponent,
        title: 'Authorization'
    },
    {
        path: 'user-page',
        component: UserPageComponent,
        title: 'User page'
    },
    {
        path: 'registration',
        component: RegistrationComponent,
        title: 'Registration'
    },
    {
        path: 'create-guide',
        component: CreateGuideComponent,
        title: 'Create a guide'
    }
];

export default routes;

