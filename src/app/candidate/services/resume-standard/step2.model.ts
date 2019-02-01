import { DropDown } from '@app/candidate/models/DropDown';

export class Step2Model {
    qualification: DropDown;
    school: string;
    achievements: string;
    position: string;
    previousCompany: string;
    yearOfWork: DropDown;
    languages: DropDown[];
    levelLanguages: DropDown[];
    description: string;
    references: string;
    skills: string;
    constructor(data) {
        if (!data) {
            return;
        }
        this.school = data.school;
        this.position = data.position;
        this.achievements = data.achievements;
        this.previousCompany = data.previousCompany;
        this.description = data.description;
        this.references = data.references;
        this.skills = data.skills;
        this.languages = [];
        this.levelLanguages = [];
    }
}
