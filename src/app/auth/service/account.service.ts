import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttpService } from '@app/auth/auth-http.service';
import { BaseHostConstant } from '@app/shared/constants/base-host.constant';


export interface SignupContext {
    email: string;
    password: string;
    isHr?: boolean;
}

const credentialsKey = 'credentials';

@Injectable()
export class AccountService {
    private API_PATH = BaseHostConstant.apiAccount;
    constructor(private _authHttpSerivce: AuthHttpService) {
    }

    singup(context: SignupContext) {
        return this._authHttpSerivce.post(this.API_PATH + '/Create', context);
    }

    getRoleUser(email) {
        const url = this.API_PATH + '/GetUserRole/' + email;
        return this._authHttpSerivce.get(url);
    }
}
