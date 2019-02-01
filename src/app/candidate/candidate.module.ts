import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountComponent } from './account/account.component';
import { Select2Module } from 'ng2-select2';

import { CandidateRoutingModule } from './candidate-routing.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CandidateComponent } from './candidate/candidate.container.component';
import { FooterComponent } from './footer/footer.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FeatureComponent } from './feature/feature.component';
import { PopularPostComponent } from './popular-post/popular-post.component';
import { BannerComponent } from './banner/banner.component';
import { JobCategoryComponent } from './job-category/job-category.component';
import { JobPostingComponent } from './job-posting/job-posting.component';
import { JobListComponent } from './job-posting/job-list/job-list.component';
import { JobSidebarComponent } from './job-posting/job-sidebar/job-sidebar.component';
import { ResumeManagerComponent } from './resume-manager/resume-manager.component';
import { StandardStep1Component } from './standard-resume/standard-step1/standard-step1.component';
import { StandardStep2Component } from './standard-resume/standard-step2/standard-step2.component';
import { StandardStep3Component } from './standard-resume/standard-step3/standard-step3.component';
import { StandardStep4Component } from './standard-resume/standard-step4/standard-step4.component';

import { CommonService } from '@app/candidate/services/common/common.service';
import { JobService } from '@app/candidate/services/job/job.service';
import { ResumeService } from '@app/candidate/services/resume-standard/resume.service';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { ApplyService } from '@app/candidate/services/apply/apply.service';
import { SearchPageComponent } from './search-page/search-page.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  imports: [
    CommonModule,
    CandidateRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    Select2Module,
    CurrencyMaskModule
  ],
  declarations: [
    NavigationBarComponent,
    HomePageComponent,
    CandidateComponent,
    FooterComponent,
    SearchBarComponent,
    FeatureComponent,
    PopularPostComponent,
    BannerComponent,
    JobCategoryComponent,
    JobPostingComponent,
    JobListComponent,
    JobSidebarComponent,
    AccountComponent,
    ResumeManagerComponent,
    StandardStep1Component,
    StandardStep2Component,
    StandardStep3Component,
    StandardStep4Component,
    JobDetailComponent,
    SearchPageComponent,
  ],
  providers: [CommonService, JobService, ResumeService, ApplyService]
})
export class CandidateModule { }
