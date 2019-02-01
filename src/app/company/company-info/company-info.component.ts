import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropDown } from '@app/candidate/models/DropDown';
import { CommonService } from '@app/candidate/services/common/common.service';
import { Router } from '@angular/router';
import { CompanyInfoModel } from '../services/companyInfo/companyInfo.model';
import { CompanyInfoService } from '@app/company/services/companyInfo/company-info.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {

  isSubmit = false;
  companyInfoForm: FormGroup;
  companyInfoModel: CompanyInfoModel;
  isEdit = false;
  commonDataModels: any;
  scales: any[];
  constructor( private formBuilder: FormBuilder ,
    private router: Router, private commonService: CommonService, private companyInfoService: CompanyInfoService) { }

  ngOnInit() {
    this.createForm();
    this.commonData();
    this.getCompanyByUser();
  }
  saveData() {
    this.isSubmit = true;
    if (this.companyInfoForm.valid) {
      this.setDataCompanyInfo();
      this.updateCompanyInfo();
    }
  }
  getCompanyByUser() {
    this.companyInfoService.getCompanyByUser()
    .subscribe((g: any) => {
      if (g.data !== null) {
        this.companyInfoService.companyInfoModel = g.data;
        this.companyInfoModel = g.data;
        if (g.data.name !== null) {
          this.isEdit = true;
        }
      }
    }, (err) => {
    });
  }
  updateCompanyInfo() {
    this.companyInfoService.companyInfoModel = this.companyInfoModel;
      this.companyInfoService.updateCompanyInfo()
      .subscribe((g: any) => {
        this.router.navigate(['/congty']);
      }, (err) => {
        this.router.navigate(['/404']);
      });
  }
  get f() {
    return this.companyInfoForm.controls;
  }
  private setDataCompanyInfo() {
    const value = this.companyInfoForm.value;
    let tempInfo = new CompanyInfoModel(value);
    tempInfo.id = this.companyInfoModel.id;
    tempInfo.email = this.companyInfoModel.email;
    this.companyInfoModel = tempInfo;
    const ddcale = this.scales.find(x => x.id === value.scale);
    const scaleDropdown = new DropDown(ddcale);
    this.companyInfoModel.scale = scaleDropdown;
  }
  private commonData() {
    this.commonService.getCommonData()
      .subscribe((g: any) => {
        if (g != null) {
          this.commonDataModels = g.data;
          this.scales = g.data.scale;
        }
      });
  }
  private createForm() {
    this.companyInfoForm = this.formBuilder.group({
      name: ['', Validators.required],
      scale: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      summary: ['', Validators.required],
      isShow: true,
    });
  }

}
