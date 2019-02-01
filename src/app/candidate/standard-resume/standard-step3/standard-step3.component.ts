import { element } from 'protractor';
import { Component, OnInit, Input } from '@angular/core';
import {CommonService} from '@app/candidate/services/common/common.service';
import { Select2OptionData } from 'ng2-select2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResumeService } from '@app/candidate/services/resume-standard/resume.service';
import { DropDown } from '@app/candidate/models/DropDown';
import { Step3Model } from '@app/candidate/services/resume-standard/step3.model';
import { Router } from '@angular/router';
import { ResumesModel } from '@app/candidate/services/resume-standard/resumes.model';
import { ResumesStatusEnum } from '@app/candidate/models/enums/resumes-status.enum';
@Component({
  selector: 'app-standard-step3',
  templateUrl: './standard-step3.component.html',
  styleUrls: ['./standard-step3.component.scss']
})
export class StandardStep3Component implements OnInit {
  @Input()
  resumeModel: ResumesModel;
  step3Model: Step3Model;
  placeOfWork: Array<Select2OptionData>;
  commonDataModels: any;
  genders: any;
  options: Select2Options;
  value: string[];
  current: string;
  levelOfWorks: any[];
  typeOfWorks: any[];
  categorystemp: any[];
  categorys: any[];
  step3Form: FormGroup;
  isSubmit = false;
  placeOfWorkValue: string[] = [];
  categorysValue: any[] = [];
  error = false;
  isEdit = false;
  isSearch = false;
  isChangePlace = false;
  currencyMask = {
    align: 'left',
    prefix: '',
    thousands: '.',
    decimal: ',',
    precision: 0
  };
  constructor(private commonService: CommonService, private formBuilder: FormBuilder, private resumeService: ResumeService ,
    private router: Router) { }

  ngOnInit() {
    this.getAllCategory();
    this.resumeService.setOrgResmue()
    .subscribe((g: any) => {
      if (g.data !== null) {
        this.resumeModel = g.data;
        this.resumeService.resumeModel = g.data;
        //console.log(this.resumeModel);
        if (this.resumeModel.purpose !== null) {
          this.isEdit = true;
          this.placeOfWorkValue = [];
          this.categorysValue = [];
          this.initSelectData();
        }
        //console.log(g.data);
        if (this.resumeModel.canSearch) {
          this.isSearch = true;
        }
        //console.log(this.isSearch);
      }
    });
    this.commonData();
    this.options = {
      multiple: true,
      maximumSelectionLength: 3
    };
    this.createStep3Form();
  }
  submitStep3(ActionType) {
    this.setDataStep3Model();
    this.resumeService.setPurposeData(this.step3Model);
    this.updateData(ActionType);
  }

  updateData(ActionType) {
    this.resumeService.updateResume()
    .subscribe((g: any) => {
      if (ActionType === 1) {
        this.router.navigate(['hoso/tieuchuan-buoc4']);
      } else if ( ActionType === 2) {
        this.router.navigate(['hoso']);
      }
    }, (err) => {
      this.router.navigate(['/404']);
    });
  }
  changedPlace(data: {value: string[]}) {
    this.placeOfWorkValue = data.value;
  }
  changedCategory(data: {value: string[]}) {
    this.categorysValue = data.value;
  }
  saveBack() {
    this.router.navigate(['hoso/tieuchuan-buoc4']);
  }
  saveDraft() {
    this.isSubmit = true;
    if (this.step3Form.valid) {
      this.submitStep3(2);
    }
  }
  saveData() {
    this.isSubmit = true;
    if (this.step3Form.valid) {
      this.submitStep3(1);
    }
  }
  get f() {
    return this.step3Form.controls;
  }
  get validMultiSelect() {
    if (this.placeOfWorkValue.length === 0 || this.categorysValue.length === 0) {
      return false;
    }
    return true;
  }
  get validPlaceOfWork() {
    if (this.placeOfWorkValue.length === 0) {
      return true;
    }
    return false;
  }
  get validCategory() {
    if (this.categorysValue.length === 0) {
      return true;
    }
    return false;
  }
  private initSelectData() {
    //console.log(this.resumeModel);
    if (this.resumeModel !== undefined && this.resumeModel.purpose !== null) {
      //console.log(this.resumeModel);
      const selectData = this.resumeModel.purpose;
      if (selectData.placeOfWorks.length > 0) {
        selectData.placeOfWorks.forEach(element => {
          this.placeOfWorkValue.push(element.id);
        });
      }
      if (selectData.categorys.length > 0) {
        selectData.categorys.forEach(element => {
          this.categorysValue.push(element.id);
        });
      }
    }
  }
  private commonData() {
    this.commonService.getCommonData()
      .subscribe((g: any) => {
        if (g != null) {
          this.commonDataModels = g.data;
          this.changeDropdownToSelect();
          this.levelOfWorks = g.data.levelOfWork;
          this.typeOfWorks = g.data.typeOfWork;
        }
      });
  }
  private setDataStep3Model() {
    const value = this.step3Form.value;
    this.step3Model = new Step3Model(value);
    const ddlevelOfWork = this.levelOfWorks.find(x => x.id === value.levelOfWork);
    const levelOfWorkDropdown = new DropDown(ddlevelOfWork);
    this.step3Model.levelOfWork = levelOfWorkDropdown;

    if (this.placeOfWorkValue.length > 0) {
      // tslint:disable-next-line:no-shadowed-variable
      this.placeOfWorkValue.forEach( element => {
        const ddplaceOfWork = this.commonDataModels.city.find(x => x.id === element);
        const placeOfWorkDropdown = new DropDown(ddplaceOfWork);
        this.step3Model.placeOfWorks.push(placeOfWorkDropdown);
      });
    }

    if (this.categorysValue.length > 0) {
      // tslint:disable-next-line:no-shadowed-variable
      this.categorysValue.forEach( element => {
        const ddcategorys = this.categorystemp.find(x => x.id === element);
        const categorysDropdown = new DropDown(ddcategorys);
        this.step3Model.categorys.push(categorysDropdown);
      });
    }

    const ddtypeOfWork = this.typeOfWorks.find(x => x.id === value.typeOfWork);
    const typeOfWorkDropdown = new DropDown(ddtypeOfWork);
    this.step3Model.typeOfWork = typeOfWorkDropdown;
  }
  private getAllCategory() {
    this.commonService.getAllCategory()
      .subscribe((g: any) => {
        if (g != null) {
          this.categorystemp = g.data;
        }
      });
  }
  private changeDropdownToSelect() {
    this.placeOfWork = [];
    // tslint:disable-next-line:no-shadowed-variable
    this.commonDataModels.city.forEach(element => {
      this.placeOfWork.push(this.parseDropdownToSelect(element));
    });
    this.categorys = [];
    // tslint:disable-next-line:no-shadowed-variable
    this.categorystemp.forEach(element => {
      this.categorys.push(this.parseCategoryToSelect(element));
    });
    this.placeOfWorkValue = [];
    this.categorysValue = [];
    this.initSelectData();
  }
  private parseDropdownToSelect(data: DropDown) {
    const select: Select2OptionData = {
      id: data.id,
      text: data.name
    };
    return select;
  }
  private parseCategoryToSelect(data: any) {
    const select: Select2OptionData = {
      id: data.id,
      text: data.name
    };
    return select;
  }
  private createStep3Form() {
    this.step3Form = this.formBuilder.group({
      levelOfWork: ['', Validators.required],
      typeOfWork: ['', Validators.required],
      salary: ['', Validators.required],
      ambition: [''],
      canChangePlace: false,
      canSearch: false,
    });
  }
}
