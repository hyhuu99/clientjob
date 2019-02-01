import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CandidateComponent } from './candidate/candidate.container.component';
import { AccountComponent } from './account/account.component';
import { ResumeManagerComponent } from './resume-manager/resume-manager.component';
import { StandardStep1Component } from './standard-resume/standard-step1/standard-step1.component';
import { StandardStep2Component } from './standard-resume/standard-step2/standard-step2.component';
import { StandardStep3Component } from './standard-resume/standard-step3/standard-step3.component';
import { StandardStep4Component } from './standard-resume/standard-step4/standard-step4.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
  {
    path: '', component: CandidateComponent, children: [
      { path: 'timviec', component: SearchPageComponent },
      { path: 'hoso/tieuchuan-buoc1', component: StandardStep1Component },
      { path: 'hoso', component: ResumeManagerComponent },
      { path: 'taikhoan', component: AccountComponent },
      { path: '', component: HomePageComponent },
      { path: 'hoso/tieuchuan-buoc2', component: StandardStep2Component },
      { path: 'hoso/tieuchuan-buoc3', component: StandardStep3Component },
      { path: 'hoso/tieuchuan-buoc4', component: StandardStep4Component },
      { path: 'congviec/:id', component: JobDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
