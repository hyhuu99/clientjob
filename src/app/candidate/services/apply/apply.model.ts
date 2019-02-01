export class ApplyModel {
    jobId: string;
    email: string;
    fileCv: File;
    constructor (data) {
        if (!data) {
            return;
        }
        this.jobId = data.jobId;
        this.email = data.email;
    }
}