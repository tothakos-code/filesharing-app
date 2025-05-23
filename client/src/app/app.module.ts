import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ProfileComponent } from './authentication/profile/profile.component';
import { AdminComponent } from './authentication/admin/admin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UserManagerComponent } from './authentication/admin/user-manager/user-manager.component';
import { ToastrModule } from 'ngx-toastr';
import { ChangePasswordComponent } from './authentication/change-password/change-password.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { CategoryManagerComponent } from './authentication/admin/category-manager/category-manager.component';
import { ContentFormComponent } from './authentication/upload/content-form.component';
import { ContentDetailComponent } from './authentication/content-detail/content-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AdminComponent,
    NavbarComponent,
    HomeComponent,
    UserManagerComponent,
    ChangePasswordComponent,
    VerifyEmailComponent,
    LoadingSpinnerComponent,
    CategoryManagerComponent,
    ContentFormComponent,
    ContentDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
      timeOut: 7500,
      maxOpened: 5
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
