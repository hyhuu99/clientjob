import { ApplyModel } from './apply.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttpService } from '@app/auth/auth-http.service';
import { BaseHostConstant } from '@app/shared/constants/base-host.constant';
import { AuthenticationService } from '@app/auth/service/authentication.service';
@Injectable()

export class ApplyService {
    private API_PATH = BaseHostConstant.apiApply;
    applyModel = new ApplyModel('');
    constructor(private _authHttpSerivce: AuthHttpService, private authenticationService: AuthenticationService) {

    }
    public createApply() {
        const options = this.authenticationService.setHeader();
        return this._authHttpSerivce.post(this.API_PATH + '/CreateApplication', this.applyModel, options);
    }

    public IsExistApplyByJob(jobId) {
        const options = this.authenticationService.setHeader();
        const url = this.API_PATH + '/IsExistApplyByJob/' + jobId;
        return this._authHttpSerivce.get(url, options);
    }

    public getApplyByJob(jobId) {
        const options = this.authenticationService.setHeader();
        const url = this.API_PATH + '/GetApplyByJob/' + jobId;
        return this._authHttpSerivce.get(url, options);
    }

    public getApplyById(applyId) {
        const options = this.authenticationService.setHeader();
        const url = this.API_PATH + '/GetApplyById/' + applyId;
        return this._authHttpSerivce.get(url, options);
    }

}
