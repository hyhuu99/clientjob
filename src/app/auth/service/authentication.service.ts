import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthHttpService } from '@app/auth/auth-http.service';
import { BaseHostConstant } from '@app/shared/constants/base-host.constant';
import { HttpHeaders } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AccountService } from '@app/auth/service/account.service';
import { EAccountType } from '@app/shared/constants/sys-enum';

export interface Credentials {
    // Customize received credentials here
    username: string;
    access_token: string;
    expires_in: number;
    isHr: boolean;
}

export interface LoginContext {
    username: string;
    password: string;
    remember?: boolean;
}

export interface SignupContext {
    lastName: string;
    firstName: string;
    email: string;
    passwordSingup: string;
    isHr?: boolean;
}

const credentialsKey = 'credentials';

@Injectable()
export class AuthenticationService {
    private API_PATH = BaseHostConstant.apiLogin;
    private _credentials: Credentials | null;
    public userRole: string;
    public loginData: any;
    constructor(private _authHttpSerivce: AuthHttpService,private accountService: AccountService) {
        const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
        if (savedCredentials) {
            this._credentials = JSON.parse(savedCredentials);
        }
    }

    login(context: LoginContext) {
        return  this._authHttpSerivce.postLogin(this.API_PATH, this.loginData);
    }
    setLoginData(context: LoginContext) {
        this.loginData = '&username=' + context.username + '&password=' + context.password;
    }
    logout() {
        this.setCredentials();
    }

    singup(context: SignupContext){
        return this._authHttpSerivce.post(this.API_PATH, context);
    }

    public isAuthenticated(): boolean {
        return !!this.credentials;
    }

    get credentials(): Credentials | null {
        return this._credentials;
    }

    public setHeader(options?: any) {
        const isLoginStatus = this.isAuthenticated();
        options = options ? options : {};
        if ( isLoginStatus ) {
            const credentials = this.credentials;
            const token = 'bearer ' + credentials.access_token;
            const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization' : token });
            options.headers = httpHeaders;
        } else {
            const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json charset=utf-8' });
            options.headers = httpHeaders;
        }
        return options;
    }

    public setCredentials(credentials?: Credentials, remember?: boolean) {
        this._credentials = credentials || null;
        if (credentials) {
            const storage = remember ? localStorage : sessionStorage;
            storage.setItem(credentialsKey, JSON.stringify(credentials));
        } else {
            sessionStorage.removeItem(credentialsKey);
            localStorage.removeItem(credentialsKey);
        }
    }
    requestLogin(cond, data): any
    {
        let result = '';
        switch (cond) {
            // candidate login
            case 'Candidate' :
            {
                result='client_id=7af65a43-0eb4-4734-9ab8-29901e795399&client_secret=secret&grant_type=password&scope=Candidate'.concat(data);
                break;
            }
            //company login
            case 'Hr':
            {
                result='client_id=272g9416-36ab-4261-bd84-3c849b51b9c4&client_secret=secret&grant_type=password&scope=Company'.concat(data);
                break;
            }
            default:
            {
                result="";
            }
        }
        return result;
    }

}
