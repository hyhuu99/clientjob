
import { Injectable } from '@angular/core';
import { AuthHttpService } from '@app/auth/auth-http.service';
import { BaseHostConstant } from '@app/shared/constants/base-host.constant';
import { Observable } from 'rxjs';
import { ResumesModel } from '@app/candidate/services/resume-standard/resumes.model';
import { AuthenticationService } from '@app/auth/service/authentication.service';
import { ResumesStatusEnum } from '@app/candidate/models/enums/resumes-status.enum';

@Injectable()
export class ResumeService {
    private API_PATH = BaseHostConstant.apiResume;
    public resumeModel = new ResumesModel;
    
    constructor(private _authHttpSerivce: AuthHttpService, private authenticationService: AuthenticationService) { }

    setContactInfoData(data: any) {
      this.resumeModel.title = data.title;
      this.resumeModel.contactInfo = data;
    }
    setExpInfoData(data: any) {
      this.resumeModel.expInfo = data;
    }
    setPurposeData(data: any) {
      this.resumeModel.purpose = data;
      this.resumeModel.canSearch = data.canSearch;
      if (data.canSearch === true) {
        this.resumeModel.status = ResumesStatusEnum.Published;
      } else {
        this.resumeModel.status = ResumesStatusEnum.Draft;
      }
    }
    get getResumesModel() {
      return this.resumeModel;
    }
    public setOrgResmue() {
      const options = this.authenticationService.setHeader();
      return this._authHttpSerivce.get(this.API_PATH + '/GetResumesByUser', options);
    }

    public createResumeStep1() {
      const options = this.authenticationService.setHeader();
      return this._authHttpSerivce.post(this.API_PATH + '/CreateResumeStep1', this.resumeModel, options);
    }

    public updateResume() {
      const options = this.authenticationService.setHeader();
      return this._authHttpSerivce.put(this.API_PATH + '/UpdateReumeStep', this.resumeModel, options);
    }

    public searchResume(data: any) {
      const options = this.authenticationService.setHeader();
      return this._authHttpSerivce.post(this.API_PATH + '/SearchResume', data, options);
    }

    public getResumeById(id) {
      const url = this.API_PATH + '/GetResumesById/' + id;
      return this._authHttpSerivce.get(url);
    }
  }
