import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from '../app/app-routing.module'
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { CandidateModule } from './candidate/candidate.module';
import { CompanyModule } from './company/company.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { NotFoundPageComponent } from './not-found.component';
import { LoginComponent } from './auth/login/login.component';


import { AuthenticationService } from '@app/auth/service/authentication.service';
import { AuthHttpService } from '@app/auth/auth-http.service';
import { AccountService } from '@app/auth/service/account.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AdminModule,
    CandidateModule,
    CompanyModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [AuthenticationService,
    AuthHttpService,AccountService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
