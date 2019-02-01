
import { Step3Model } from '@app/candidate/services/resume-standard/step3.model';
import {Step1Model} from '@app/candidate/services/resume-standard/step1.model';
import { ResumesStatusEnum } from '@app/candidate/models/enums/resumes-status.enum';
import { Step2Model } from '@app/candidate/services/resume-standard/step2.model';
export class ResumesModel {
    id: string;
    title: string;
    contactInfo: Step1Model;
    expInfo: Step2Model;
    purpose: Step3Model;
    email: string;
    status: ResumesStatusEnum;
    canSearch: boolean;
    constructor() {
        this.status = ResumesStatusEnum.Draft;
        this.contactInfo = null;
        this.expInfo = null;
        this.purpose = null;
        this.canSearch = false;
    }
}
