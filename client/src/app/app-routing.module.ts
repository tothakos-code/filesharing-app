import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './authentication/admin/admin.component';
import { ContentFormComponent } from './authentication/upload/content-form.component';
import { LoginComponent } from './authentication/login/login.component';
import { ProfileComponent } from './authentication/profile/profile.component';
import { ContentDetailComponent } from './authentication/content-detail/content-detail.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthenticationGuard } from './guards/authentication.guard';
import { HomeComponent } from './home/home.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { CategoryManagerComponent } from "./authentication/admin/category-manager/category-manager.component";
import { UploaderGuard } from "./guards/uploader.guard";
import {UserManagerComponent} from "./authentication/admin/user-manager/user-manager.component";

const routes: Routes = [
  { path: '', canActivate: [AuthenticationGuard], component: HomeComponent, pathMatch: 'full' },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', canActivate: [AuthenticationGuard], component: ProfileComponent },
  { path: 'admin', canActivate: [AuthenticationGuard, AdminGuard], component: AdminComponent },
  { path: 'admin/categories', component: CategoryManagerComponent,  canActivate: [AuthenticationGuard, AdminGuard] },
  { path: 'admin/users', component: UserManagerComponent,  canActivate: [AuthenticationGuard, AdminGuard] },
  { path: 'upload', component: ContentFormComponent,  canActivate: [AuthenticationGuard, UploaderGuard] },
  { path: 'content/:id', canActivate: [AuthenticationGuard], component: ContentDetailComponent },
  { path: 'edit/:id', component: ContentFormComponent, canActivate: [AuthenticationGuard,UploaderGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
