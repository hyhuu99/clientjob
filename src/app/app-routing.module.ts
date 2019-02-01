import { CompanyComponent } from '@app/company/company/company.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { HomePageComponent } from './candidate/home-page/home-page.component';

const appRoutes: Routes = [
    { path: 'congty', redirectTo: '/congty', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/', pathMatch: 'full' },
    // { path: '**', component: NotFoundPageComponent }
    {path: '404', component: NotFoundPageComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }