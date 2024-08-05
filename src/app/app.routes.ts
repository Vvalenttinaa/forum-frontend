import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { ForumPageComponent } from './components/forum-page/forum-page.component';
import { ModeratorPageComponent } from './components/moderator-page/moderator-page.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { moderatorGuard } from './guards/moderator.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    title: 'Registration',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'users',
    component: AdminPageComponent,
    title: 'Users',
    canActivate: [adminGuard]
  },
  {
    path: 'approvments',
    component: ModeratorPageComponent,
    title: 'Aprovments',
    canActivate: [moderatorGuard]
  },
  {
    path: 'forum',
    component: ForumPageComponent,
    title: 'Forum',
    canActivate: [authGuard]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    title: 'Unauthorized'
  }
];
