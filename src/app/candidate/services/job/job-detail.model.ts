import { DropDown } from '@app/candidate/models/DropDown';
import { JobTypeConstants } from "@app/candidate/models/constants/job-type.constant";
import { JobTypeEnum } from "@app/candidate/models/enums/job-type.enum";

export class JobDetailModel {
    public id: string;
    public name: string;
    public categoryId: string;
    public categoryName: string;
    public jobType: JobTypeEnum;
    public jobTypeName: string;
    public description: string;
    public summary: string;
    public vacancies: string;
    public expirationDate: Date;
    public salary: number;
    public status: number;
    public companyId: string;
    public companyName: string;
    public locationId: string;
    public location: string;
    public level: DropDown;
    public isShowSalary: boolean;

    constructor(data) {
        if (!data) {
            return;
        }
        this.id = data.id;
        this.name = data.name;
        this.categoryId = data.categoryId;
        this.categoryName = data.categoryName;
        this.jobType = data.jobType;
        this.jobTypeName = JobTypeConstants.find(x => x.key === this.jobType).value;
        this.description = data.description;
        this.summary = data.summary;
        this.vacancies = data.vacancies;
        this.expirationDate = data.expirationDate;
        this.salary = data.salary;
        this.status = data.status;
        this.companyId = data.companyId;
        this.companyName = data.companyName;
        this.locationId = data.locationId;
        this.location = data.location;
        this.level = data.level;
        this.isShowSalary = data.isShowSalary;
    }
}
