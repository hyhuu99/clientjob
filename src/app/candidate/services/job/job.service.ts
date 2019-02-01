import { Injectable } from '@angular/core';
import { AuthHttpService } from '@app/auth/auth-http.service';
import { BaseHostConstant } from '@app/shared/constants/base-host.constant';
import { Observable } from 'rxjs';
import { JobDetailModel } from '@app/candidate/services/job/job-detail.model';
import 'rxjs/add/operator/map';
import { JobLocations } from './job-locations.model';
import { JobCategories } from './job-categories.model';
import { Location } from './location.model';
import HttpParamsHelper from '@app/shared/helpers/http-params.helper';
import ParseObjectHelper from '@app/shared/helpers/parse-filter-object.helper';
import { Category } from './category.model';
import { JobQueryModel } from './job-query.model';

@Injectable()
export class JobService {
  private API_PATH = BaseHostConstant.apiJobHost;

  constructor(private _authHttpSerivce: AuthHttpService) { }

  public getJobs(params: JobQueryModel): Observable<JobDetailModel[]> {
    return this._authHttpSerivce.get(this.API_PATH + "/jobs",
    { params: HttpParamsHelper.parseObjectToHttpParams(ParseObjectHelper.parseObject(params, [])) })
      .map((response: any) => {
        return response.map(item => {
          return new JobDetailModel(item);
        });
      });
  }

  public createJob(data: JobDetailModel) {
    return this._authHttpSerivce.post(this.API_PATH, data);
  }

  public updateJob(data: JobDetailModel) {
    return this._authHttpSerivce.put(this.API_PATH, data);
  }

  public getJobLocations(): Observable<JobLocations[]> {
    return this._authHttpSerivce.get(this.API_PATH + "/jobLocations")
      .map((response: any) => {
        return response.map(item => {
          return new JobLocations(item);
        });
      });
  }

  public getJobCategories(): Observable<JobCategories[]> {
    return this._authHttpSerivce.get(this.API_PATH + "/jobCategories")
      .map((response: any) => {
        return response.map(item => {
          return new JobCategories(item);
        });
      });
  }

  public getJobsById(id: any): Observable<JobDetailModel[]> {
    const url = this.API_PATH + '/GetJobById/' + id;
    return this._authHttpSerivce.get(url);
  }
  
  public getLocations(): Observable<Location[]> {
    return this._authHttpSerivce.get(this.API_PATH + "/locations")
      .map((response: any) => {
        return response.map(item => {
          return new Location(item);
        });
      });
  }

  public getCategories(): Observable<Category[]> {
    return this._authHttpSerivce.get(this.API_PATH + "/categories")
      .map((response: any) => {
        return response.map(item => {
          return new Category(item);
        });
      });
  }
}
