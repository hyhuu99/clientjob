import { CompanyInfoService } from './services/companyInfo/company-info.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Select2Module } from 'ng2-select2';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { CompanyRoutingModule } from './company-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { CompanyComponent } from './company/company.component';
import { SearchCandidateComponent } from './search-candidate/search-candidate.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { RecruitmentService } from './services/recruitment/recruitment.service';
import { ApplyListComponent } from './apply/apply-list/apply-list.component';
import { ApplyDetailComponent } from './apply/apply-detail/apply-detail.component';
import { ResumeDetailComponent } from './resume-detail/resume-detail.component';


@NgModule({
  imports: [
    CommonModule,
    CompanyRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
    CurrencyMaskModule
  ],
  declarations: [HomePageComponent,
    NavigationBarComponent,
    CompanyComponent,
    SearchCandidateComponent,
    RecruitmentComponent,
    CompanyInfoComponent,
    ApplyListComponent,
    ApplyDetailComponent,
    ResumeDetailComponent
  ],
    providers: [CompanyInfoService, RecruitmentService],
})
export class CompanyModule { }
