import { DropDown } from '@app/candidate/models/DropDown';
import { JobTypeEnum } from '@app/candidate/models/enums/job-type.enum';
import { JobStatusEnum } from '@app/candidate/models/enums/job-status.enum';

export class RecruitmentModel {
    id: string;
    name: string;
    categoryId: string;
    locationId: string;
    level: DropDown;
    jobType: JobTypeEnum;
    salary: string;
    description: string;
    summary: string;
    expirationDate: Date;
    startDay: Date;
    isShowSalary: boolean;
    status: JobStatusEnum;
    dateToString: string;
    vacancies: number;
    constructor(data) {
        if (!data) {
            return;
        }
        this.id = data.id;
        this.salary = data.salary;
        this.level = data.level;
        this.name = data.name;
        this.jobType = data.jobType;
        this.description = data.description;
        this.summary = data.summary;
        this.isShowSalary = data.isShowSalary;
        this.status = JobStatusEnum.Draft;
        this.vacancies = 0;
    }
}
