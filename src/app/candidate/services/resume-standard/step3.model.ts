import { DropDown } from '@app/candidate/models/DropDown';

export class Step3Model {
    levelOfWork: DropDown;
    typeOfWork: DropDown;
    salary: string;
    ambition: string;
    canChangePlace: boolean;
    placeOfWorks: DropDown[];
    categorys: DropDown[];
    canSearch = false;
    constructor(data) {
        if (!data) {
            return;
        }
        this.salary = data.salary;
        this.ambition = data.ambition;
        this.canChangePlace = data.canChangePlace;
        this.placeOfWorks = [];
        this.categorys = [];
        this.canSearch = data.canSearch;
    }
}
