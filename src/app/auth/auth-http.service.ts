import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './base.service';

@Injectable()
export class AuthHttpService extends BaseService {
    constructor(private http: HttpClient) {
        super();
    }

    public get(url: string, options?: any): Observable<any> {
        options = this.setDefaultOptions(options);

        return this.http.get(url, options);
    }

    public put(url: string, data: any, options?: any): Observable<any> {
        options = this.setDefaultOptions(options);

        const body = JSON.stringify(data);

        return this.http.put(url, body, options);
    }

    public delete(url: string, options?: any): Observable<any> {
        options = this.setDefaultOptions(options);

        return this.http.delete(url, options);
    }

    public post(url: string, data: any, options?: any): Observable<any> {
        options = this.setDefaultOptions(options);
        const body = JSON.stringify(data);
        return this.http.post(url, body, options);
    }

    public postForm(url: string, formdata: FormData, options?: any): Observable<any> {
        options = this.setDefaultOptions(options);
        options.headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
        return this.http.post(url, formdata, options);
    }

    public putForm(url: string, formdata: FormData, options?: any): Observable<any> {
        options = this.setDefaultOptions(options);
        options.headers = new HttpHeaders({ 'enctype': 'multipart/form-data' });
        return this.http.put(url, formdata, options);
    }

    public postLogin(url: string, data: any, options?: any): Observable<any> {
        options = options ? options : {};
        const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        options.headers = httpHeaders;
        const body = data;
        return this.http.post(url, body, options);
    }

    private setDefaultOptions(options?: any) {
        options = options ? options : {};
        if (!options.headers) {
            const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
            options.headers = httpHeaders;
        }

        return options;
    }
}
