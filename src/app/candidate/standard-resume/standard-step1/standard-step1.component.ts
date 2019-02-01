
import { Component, OnInit, Input } from '@angular/core';
import {Step1Model} from '@app/candidate/services/resume-standard/step1.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NgbDatepickerConfig, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {CommonService} from '@app/candidate/services/common/common.service';
import {CmCountryModel} from '@app/candidate/services/common/cmCountry.model.ts';
import { Router } from '@angular/router';
import {ResumeService} from '@app/candidate/services/resume-standard/resume.service';
import { DropDown } from '@app/candidate/models/DropDown';
import { ResumesModel } from '@app/candidate/services/resume-standard/resumes.model';
@Component({
  selector: 'app-standard-step1',
  templateUrl: './standard-step1.component.html',
  styleUrls: ['./standard-step1.component.scss']
})
export class StandardStep1Component implements OnInit {
  @Input()
  resumeModel = new ResumesModel();
  step1: Step1Model;
  step1Form: FormGroup;
  isSubmit = false;
  dateOfBirth: NgbDateStruct;
  commonDataModels: any;
  genders: any[];
  citys: any[];
  countrys: any[];
  relationships: any[];
  nationalitys: any[];
  error = false;
  isFirstTime = true;
  notBindingCity = false;
  selectedFile: File;
  imageSrc: string;
  constructor(private formBuilder: FormBuilder, configDate: NgbDatepickerConfig, private commonService: CommonService,
    private router: Router, private resumeService: ResumeService) {
    configDate.minDate = {day: 1, month: 1, year: 1950 };
    configDate.maxDate = {day: 31, month: 12, year: 2008};
  }
  ngOnInit() {
    this.createStep1Form();
    this.commonData();
    this.resumeService.setOrgResmue()
    .subscribe((g: any) => {
      if (g.data !== null) {
        this.resumeService.resumeModel = g.data;
        this.resumeModel = g.data;
        this.isFirstTime = false;
        if (g.data.contactInfo !== null) {
          this.step1 = g.data.contactInfo;
          this.imageSrc = this.step1.image;
          this.setBirthDay();
        }
        this.loadCountry();
      }
    });
  }
  deleteImage() {
    this.imageSrc = null;
  }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
      this.step1.image = this.imageSrc;
    };
    reader.readAsDataURL(file);
  }

  submitStep1() {
    this.setDataStep1Model();
    this.resumeService.setContactInfoData(this.step1);
  }
  createOrUpdate() {
    if (this.isFirstTime) {
      this.resumeService.createResumeStep1()
      .subscribe((g: any) => {
        this.router.navigate(['hoso/tieuchuan-buoc2']);
      }, (err) => {
        this.router.navigate(['/404']);
      });
    } else {
      this.resumeService.updateResume()
      .subscribe((g: any) => {
        this.router.navigate(['hoso/tieuchuan-buoc4']);
      }, (err) => {
        this.router.navigate(['/404']);
      });
    }
  }
  saveBack() {
    this.isSubmit = true;
    if (this.step1Form.valid) {
        this.submitStep1();
      if (this.isFirstTime) {
        this.resumeService.createResumeStep1()
        .subscribe((g: any) => {
         this.router.navigate(['hoso']);
        }, (err) => {
          this.error = true;
        });
      } else {
        this.resumeService.updateResume()
        .subscribe((g: any) => {
          this.router.navigate(['hoso']);
       }, (err) => {
           this.error = true;
       });
      }
    }
  }
  onClose() {
    this.router.navigate(['hoso/tieuchuan-buoc4']);
  }
  saveData() {
    this.isSubmit = true;
    if (this.step1Form.valid) {
      this.submitStep1();
      this.createOrUpdate();
    }
  }

  get f() {
    return this.step1Form.controls;
  }
  public onChangeCountry(event): void {  // event will give you full breif of action
    const newVal = event.target.value;
    if (newVal === 'VN') {
      this.citys = this.commonDataModels.city;
    } else {
      this.citys = null;
    }
  }
  private loadCountry() {
    if (this.commonDataModels !== undefined && this.resumeModel.contactInfo !== null) {
      if (this.resumeModel.contactInfo.country.id === 'VN') {
        this.citys = this.commonDataModels.city;
      } else {
        this.notBindingCity = true;
        this.citys = null;
      }
    }
  }
  private setDataStep1Model() {
    const value = this.step1Form.value;
    this.step1 = new Step1Model(value);
    const ddCountry = this.countrys.find(x => x.id === value.country);
    const countryDropdown = new DropDown(ddCountry);
    this.step1.country = countryDropdown;

    if (this.citys !== null && this.citys.length > 0) {
      const ddCity = this.citys.find(x => x.id === value.city);
    this.step1.city = new DropDown(ddCity);
    }

    const ddGender = this.genders.find(x => x.id === value.gender);
    this.step1.gender = new DropDown(ddGender);

    const ddRelationship = this.relationships.find(x => x.id === value.gender);
    this.step1.relationShip = new DropDown(ddRelationship);

    const ddNationality = this.countrys.find(x => x.id === value.nationality);
    this.step1.nationality = new DropDown(ddNationality);

    this.step1.birthDay = this.dateOfBirth.day + '/' + this.dateOfBirth.month + '/' + this.dateOfBirth.year;

    this.step1.image = this.imageSrc;
  }
  private commonData() {
    this.commonService.getCommonData()
      .subscribe((g: any) => {
        if (g != null) {
          this.commonDataModels = g.data;
          this.genders = this.commonDataModels.gender;
          this.countrys = this.commonDataModels.country;
          this.relationships = this.commonDataModels.relationship;
          this.nationalitys = this.commonDataModels.nationality;
          this.loadCountry();
        }
      });
  }
  private setBirthDay() {
    if (this.resumeModel.contactInfo.birthDay !== null) {
      const date = this.resumeModel.contactInfo.birthDay.split('/');
      this.dateOfBirth = {day: Number(date[0]), month: Number(date[1]), year: Number(date[2])};
    }
  }
  private createStep1Form() {
    this.step1Form = this.formBuilder.group({
      title: ['', Validators.required],
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      dayOfBirth: ['', Validators.required],
      relationship: ['', Validators.required],
      nationality: ['', Validators.required],
      address: ['', Validators.required],
      city: [''],
      country: ['', Validators.required],
      phoneNumber: [''],
      email: ['', Validators.required]
    });
  }
  matchingEmails(emailKey: string, confirmEmailKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      // tslint:disable-next-line:prefer-const
      let email = group.controls[emailKey];
      // tslint:disable-next-line:prefer-const
      let confirmEmail = group.controls[confirmEmailKey];
      if (email.value !== confirmEmail.value) {
        return {
          mismatchedEmails: true
        };
      }
    };
  }

}
