import { JobTypeEnum } from "@app/candidate/models/enums/job-type.enum";

export const JobTypeConstants = [
    { key: JobTypeEnum.FullTime, value: 'Full Time' },
    { key: JobTypeEnum.PartTime, value: 'Part-time' },
    { key: JobTypeEnum.Temporary, value: 'Temporary' },
    { key: JobTypeEnum.Internship, value: 'Internship' }
];

export const JobTypeConstantsViet = [
    { key: JobTypeEnum.FullTime, value: 'Toán thời gian' },
    { key: JobTypeEnum.PartTime, value: 'Bán thời gian' },
    { key: JobTypeEnum.Temporary, value: 'Thời vụ' },
    { key: JobTypeEnum.Internship, value: 'Thực tập' }
];