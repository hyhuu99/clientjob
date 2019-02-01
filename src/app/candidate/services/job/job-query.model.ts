import { JobTypeEnum } from "@app/candidate/models/enums/job-type.enum";

export class JobQueryModel {
    public searchText: string;
    public jobType: JobTypeEnum;
    public categoryId: string;
    public locationId: string;
    public pageIndex: number;
    public isActive = true;
    constructor(data?: any) {
        if (!data) {
            return;
        }
        this.searchText = data.searchText;
        this.jobType = data.jobType !== null ? data.jobType : null;
        this.categoryId = data.categoryId;
        this.locationId = data.locationId;
        this.pageIndex = data.pageIndex;
    }
}
