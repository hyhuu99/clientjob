import { JobStatusEnum } from "@app/candidate/models/enums/job-status.enum";

export const JobStatusConstants = [
    { key: JobStatusEnum.Draft, value: 'Draft' },
    { key: JobStatusEnum.Published, value: 'Published' },
    { key: JobStatusEnum.Closed, value: 'Closed' },
];