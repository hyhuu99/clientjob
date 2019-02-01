import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '@app/candidate/services/common/common.service';
import { Router } from '@angular/router';
import { ResumeService } from '@app/candidate/services/resume-standard/resume.service';
import { Step2Model } from '@app/candidate/services/resume-standard/step2.model';
import { DropDown } from '@app/candidate/models/DropDown';
import { ResumesModel } from '@app/candidate/services/resume-standard/resumes.model';
import { element } from 'protractor';
@Component({
  selector: 'app-standard-step2',
  templateUrl: './standard-step2.component.html',
  styleUrls: ['./standard-step2.component.scss']
})
export class StandardStep2Component implements OnInit {
  @Input()
  resumeModel = new ResumesModel();
  step2Model: Step2Model;
  step2Form: FormGroup;
  commonDataModels: any;
  languages: any[];
  qualifications: any[];
  levels: any[];
  yearOfWorks: any[];
  disabled = { disabled1: true, disabled2: true, disabled3: true };
  isSubmit = false;
  languagesInput = { value1: '0', value2: '0', value3: '0'};
  levelsInput = { value1: '1', value2: '1', value3: '1'};
  disabledGroupExp = true;
  error = false;
  disableLevelLg = 0;
  constructor(private formBuilder: FormBuilder, private router: Router, private resumeService: ResumeService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.createStep2Form();
    this.commonData();
    this.resumeService.setOrgResmue()
    .subscribe((g: any) => {
      if (g.data !== null) {
        this.resumeService.resumeModel = g.data;
        this.resumeModel = g.data;
        if (this.resumeModel.expInfo !== undefined && this.resumeModel.expInfo !== null) {
          this.setDisableOnEdit();
        }
      }
    });
  }

  get f() {
    return this.step2Form.controls;
  }
  submitStep2() {
    this.setDataStep2Model();
    this.resumeService.setExpInfoData(this.step2Model);
  }
  updateData(ActionType) {
    this.resumeService.updateResume()
    .subscribe((g: any) => {
      if (ActionType === 1) {
          this.router.navigate(['hoso/tieuchuan-buoc3']);
      } else if (ActionType === 2) {
          this.router.navigate(['hoso']);
      } else if (ActionType === 3) {
        this.router.navigate(['hoso/tieuchuan-buoc4']);
    }
    }, (err) => {
      this.router.navigate(['/404']);
    });
  }
  onClose() {
    this.router.navigate(['hoso/tieuchuan-buoc4']);
  }
  saveData() {
    this.isSubmit = true;
    if (this.step2Form.valid) {
      this.submitStep2();
      this.updateData(1);
    }
  }
  saveDataAndBack() {
    this.isSubmit = true;
    if (this.step2Form.valid) {
      this.submitStep2();
      this.updateData(3);
    }
  }
  saveDraft() {
    this.isSubmit = true;
    if (this.step2Form.valid) {
      this.submitStep2();
      this.updateData(2);
    }
  }
  public onChangeLanguage(event): void {
    const newVal = event.target.value;
    if (newVal !== '0') {
      this.disabled.disabled1 = false;
    } else {
      this.disabled.disabled1 = true;
    }
  }
  public onChangeLanguage2(event): void {
    const newVal = event.target.value;
    if (newVal !== '0') {
      this.disabled.disabled2 = false;
    } else {
      this.disabled.disabled2 = true;
    }
  }
  public onChangeLanguage3(event): void {
    const newVal = event.target.value;
    if (newVal !== '0') {
      this.disabled.disabled3 = false;
    } else {
      this.disabled.disabled3 = true;
    }
  }
  onChangeYear(event) {
    const newVal = event.target.value;
    if (newVal !== '0') {
      this.disabledGroupExp = false;
      this.step2Form.controls['position'].validator = Validators.compose([Validators.required]);
      this.step2Form.controls['position'].updateValueAndValidity();

      this.step2Form.controls['previousCompany'].validator = Validators.compose([Validators.required]);
      this.step2Form.controls['previousCompany'].updateValueAndValidity();
    } else {
      this.disabledGroupExp = true;
      this.step2Form.controls['position'].validator = Validators.compose([]);
      this.step2Form.controls['position'].updateValueAndValidity();

      this.step2Form.controls['previousCompany'].validator = Validators.compose([]);
      this.step2Form.controls['previousCompany'].updateValueAndValidity();
    }
  }
  private setDisableOnEdit() {
    const data = this.resumeModel.expInfo;
    const languages = this.resumeModel.expInfo.languages;
    if (languages.length >= 1) {
      this.disabled.disabled1 = false;
      this.disableLevelLg = 1;
      this.languagesInput.value1 = languages[0].id;
    }
    if (languages.length >= 2) {
      this.disabled.disabled2 = false;
      this.disableLevelLg = 2;
      this.languagesInput.value2 = languages[1].id;
    }
    if (languages.length >= 3) {
      this.disabled.disabled3 = false;
      this.disableLevelLg = 3;
      this.languagesInput.value3 = languages[2].id;
    }
    if (data.yearOfWork.id !== '0') {
      this.disabledGroupExp = false;
    }
  }
  private commonData() {
    this.commonService.getCommonData()
      .subscribe((g: any) => {
        if (g != null) {
          this.commonDataModels = g.data;
          this.qualifications = this.commonDataModels.qualification;
          this.languages = this.commonDataModels.language;
          this.levels = this.commonDataModels.level;
          this.yearOfWorks = this.commonDataModels.yearOfWork;
        }
      });
  }
  private setDataStep2Model() {
    const value = this.step2Form.value;
    this.step2Model = new Step2Model(value);
    const ddQualification = this.qualifications.find(x => x.id === value.qualification);
    const qualificationDropdown = new DropDown(ddQualification);
    this.step2Model.qualification = qualificationDropdown;

    const ddYearOfWork = this.yearOfWorks.find(x => x.id === value.yearOfWork);
    this.step2Model.yearOfWork = new DropDown(ddYearOfWork);

    if (this.languagesInput.value1 !== '0') {
      this.initLanguagesLevels(this.languagesInput.value1, this.levelsInput.value1);
    }

    if (this.languagesInput.value2 !== '0') {
      this.initLanguagesLevels(this.languagesInput.value2, this.levelsInput.value2);
    }

    if (this.languagesInput.value3 !== '0') {
      this.initLanguagesLevels(this.languagesInput.value3, this.levelsInput.value3);
    }
  }
  private initLanguagesLevels(language, level) {
    const ddLanguage = this.languages.find(x => x.id === language);
      const ddLevel = this.levels.find(x => x.id === level);
        this.step2Model.languages.push(ddLanguage);
        this.step2Model.levelLanguages.push(ddLevel);
  }
  private createStep2Form() {
    this.step2Form = this.formBuilder.group({
      qualification: ['', Validators.required],
      school: ['', Validators.required],
      achievements: [''],
      position: [''],
      previousCompany: [''],
      yearOfWork: ['', Validators.required],
      description:  [''],
      references: [''],
      skills: ['', Validators.required],
    });
  }

}
