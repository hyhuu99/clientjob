import { DropDown } from '@app/candidate/models/DropDown';


export class CompanyInfoModel {
    id: string;
    name: string;
    scale: DropDown;
    address: string;
    phoneNumber: string;
    summary: string;
    email: string;
    isShow: boolean;
    constructor(data) {
        if (!data) {
            return;
        }

        this.name = data.name;
        this.address = data.address;
        this.phoneNumber = data.phoneNumber;
        this.summary = data.summary;
        this.isShow = data.isShow;
        this.scale = data.scale;
    }
}
