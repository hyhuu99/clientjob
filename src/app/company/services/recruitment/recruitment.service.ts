import { AuthHttpService } from '@app/auth/auth-http.service';
import { BaseHostConstant } from '@app/shared/constants/base-host.constant';
import { Observable } from 'rxjs';
import { ResumesModel } from '@app/candidate/services/resume-standard/resumes.model';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '@app/auth/service/authentication.service';
import { RecruitmentModel } from './recruitment.model';

@Injectable()
export class RecruitmentService {
    private API_PATH = BaseHostConstant.apiJobHost;
    public recruitmentModel: RecruitmentModel;
    constructor(private _authHttpSerivce: AuthHttpService, private authenticationService: AuthenticationService) { }

    public createRecruitment() {
        const options = this.authenticationService.setHeader();
        return this._authHttpSerivce.post(this.API_PATH + '/CreateJob', this.recruitmentModel, options);
    }
    public updateRecruitment() {
        const options = this.authenticationService.setHeader();
        return this._authHttpSerivce.put(this.API_PATH + '/UpdateJob', this.recruitmentModel, options);
    }

    public deleteRecruitment(jobId) {
        const options = this.authenticationService.setHeader();
        const url = this.API_PATH + '/DeleteJob/' + jobId;
        return this._authHttpSerivce.get(url, options);
    }

    getJobByCompany( companyId) {
        const options = this.authenticationService.setHeader();
        const url = this.API_PATH + '/GetJobsByCompanyId?companyId=' + companyId;
        return this._authHttpSerivce.get(url, options);
    }

    getJobById( resumesId) {
        const url = this.API_PATH + '/GetJobById/' + resumesId;
        return this._authHttpSerivce.get(url);
    }

}
