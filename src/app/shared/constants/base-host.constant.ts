import { environment } from 'environments/environment';

export class BaseHostConstant {
    public static apiJobHost: string = environment.apiUrl + 'api/'  + 'job';
    public static apiLogin: string = environment.apiUrl + '/connect/token';
    public static apiCommonHost: string = environment.apiUrl + 'api/' + 'Common';
    public static apiAccount: string = environment.apiUrl + 'api/' + 'Account';
    public static apiResume: string = environment.apiUrl + 'api/' + 'Resume';
    public static apiCompany: string = environment.apiUrl + 'api/' + 'Company';
    public static apiApply: string = environment.apiUrl + 'api/' + 'Application';
}