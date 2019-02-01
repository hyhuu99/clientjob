import { Injectable } from '@angular/core';

@Injectable()
export class ClientStorageService {
    public setLocalStorage(key: string, data: any): void {
        const expiredTime = new Date().getTime() + (60 * 60 * 1000);
        const dataRecord = { value: JSON.stringify(data), expiredTime: expiredTime };
        window.localStorage.setItem(key, JSON.stringify(dataRecord));
    }

    public getLocalStorage(key: string): any {
        const data = JSON.parse(window.localStorage.getItem(key));
        if (!data) { return; }
        if (data.expiredTime > new Date().getTime()) {
            return JSON.parse(data.value);
        }

        window.localStorage.removeItem(key);
        return;
    }

    public removeLocalStorage(key?: string): void {
        if (key) {
            window.localStorage.removeItem(key);
        } else {
            window.localStorage.clear();
        }
    }

    public setSessionStorage(key: string, data: any): void {
        window.sessionStorage.setItem(key, data);
    }

    public getSessionStorage(key: string): string {
        return window.sessionStorage.getItem(key);
    }

    public removeSessionStorage(key?: string) {
        if (key) {
            window.sessionStorage.removeItem(key);
        } else {
            window.sessionStorage.clear();
        }
    }
}
