import { AuthHttpService } from '@app/auth/auth-http.service';
import { BaseHostConstant } from '@app/shared/constants/base-host.constant';
import { Observable } from 'rxjs';
import { ResumesModel } from '@app/candidate/services/resume-standard/resumes.model';
import { Injectable } from '@angular/core';
import { CompanyInfoModel } from '@app/company/services/companyInfo/companyInfo.model';
import { AuthenticationService } from '@app/auth/service/authentication.service';

@Injectable()
export class CompanyInfoService {
    private API_PATH = BaseHostConstant.apiCompany;
    public companyInfoModel: CompanyInfoModel;
    constructor(private _authHttpSerivce: AuthHttpService, private authenticationService: AuthenticationService) { }

    public createCompanyInfo() {
        const options = this.authenticationService.setHeader();
        return this._authHttpSerivce.post(this.API_PATH + '/CreateCompanyInfo', this.companyInfoModel, options);
    }
    public updateCompanyInfo() {
        const options = this.authenticationService.setHeader();
        return this._authHttpSerivce.put(this.API_PATH + '/UpdateCompanyInfo', this.companyInfoModel, options);
    }

    getCompanyByUser() {
        const options = this.authenticationService.setHeader();
        return this._authHttpSerivce.get(this.API_PATH + '/GetCompanyByEmail', options);
    }

    getCompanyById(id) {
        const url = this.API_PATH + '/GetCompanyById/' + id;
        return this._authHttpSerivce.get(url);
    }

}
