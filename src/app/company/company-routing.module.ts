



import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from '@app/company/company/company.component';
import { HomePageComponent } from '@app/company/home-page/home-page.component';
import { SearchCandidateComponent } from '@app/company/search-candidate/search-candidate.component';
import { RecruitmentComponent } from './recruitment/recruitment.component';
import { AccountComponent } from '@app/candidate/account/account.component';
import { CompanyInfoComponent } from '@app/company/company-info/company-info.component';
import { NotFoundPageComponent } from '@app/not-found.component';
import { ApplyListComponent } from '@app/company/apply/apply-list/apply-list.component';
import { ApplyDetailComponent } from '@app/company/apply/apply-detail/apply-detail.component';
import { ResumeDetailComponent } from '@app/company/resume-detail/resume-detail.component';
const routes: Routes = [
  {
    path: 'congty', component: CompanyComponent, children: [
      { path: 'dangtin', component: RecruitmentComponent },
      { path: 'timungvien', component: SearchCandidateComponent },
      { path: 'dangtin/:id', component: RecruitmentComponent },
      { path: 'ungtuyen/:id', component: ApplyListComponent },
      { path: 'chitietungtuyen/:id', component: ApplyDetailComponent },
      { path: 'timungvien/chitiethoso/:id', component: ResumeDetailComponent },
      { path: 'taikhoan', component: AccountComponent },
      { path: 'thongtin', component: CompanyInfoComponent },
      { path: '', component: HomePageComponent },
      { path: '404', component: NotFoundPageComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
