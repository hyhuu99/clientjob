import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttpService } from '@app/auth/auth-http.service';
import { BaseHostConstant } from '@app/shared/constants/base-host.constant';

@Injectable()

export class CommonService {
    private API_PATH = BaseHostConstant.apiCommonHost;
    constructor(private _authHttpSerivce: AuthHttpService) {
        
    }
    public getCommonData(){
        return this._authHttpSerivce.get(this.API_PATH + '/GetAllForStandart');
    }

    public getAllCategory(){
        return this._authHttpSerivce.get(this.API_PATH + '/GetAllCategory');
    }
}
