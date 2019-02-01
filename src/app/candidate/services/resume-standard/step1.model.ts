import { DropDown } from '@app/candidate/models/DropDown';

export class Step1Model {
    title: string;
    fullName: string;
    gender: DropDown;
    birthDay: string;
    relationShip: DropDown;
    nationality: DropDown;
    address: string;
    city: DropDown;
    country: DropDown;
    phoneNumber: string;
    email: string;
    image: string;
    constructor(data) {
        if (!data) {
            return;
        }
        this.title = data.title;
        this.fullName = data.fullName;
        this.address = data.address;
        this.phoneNumber = data.phoneNumber;
        this.email = data.email;
    }

}