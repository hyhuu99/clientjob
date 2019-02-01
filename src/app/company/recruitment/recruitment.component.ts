import { CompanyInfoService } from '@app/company/services/companyInfo/company-info.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NgbDatepickerConfig, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {RecruitmentModel} from '@app/company/services/recruitment/recruitment.model';
import { CommonService } from '@app/candidate/services/common/common.service';
import { DropDown } from '@app/candidate/models/DropDown';
import { RecruitmentService } from '../services/recruitment/recruitment.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class RecruitmentComponent implements OnInit {
  @Input()
  private id;
  isSubmit = false;
  recruitmentForm: FormGroup;
  recruitmentModel: RecruitmentModel;
  isEdit = false;
  categorysTemp: any[];
  locationTemp: any[];
  locationValue: any[] = [];
  categorys: any[];
  locations: any[];
  categorysValue: any[] = [];
  commonDataModels: any;
  jobTypeModels: any[];
  levels: any[];
  minDate: any;
  options: Select2Options;
  startDayLoad: NgbDateStruct;
  currencyMask = {
    align: 'left',
    prefix: '',
    thousands: '.',
    decimal: ',',
    precision: 0
  };
  constructor( private formBuilder: FormBuilder
    , private router: Router, private commonService: CommonService, private recruitmentService: RecruitmentService
    , private route: ActivatedRoute, private companyInfoService: CompanyInfoService) {
      const displayDate = new Date();
      // tslint:disable-next-line:max-line-length
      this.minDate = { year: Number(displayDate.getFullYear()), month: Number(displayDate.getMonth()) + 1, day: Number(displayDate.getDay()) };
    }

  ngOnInit() {
    this.checkCompanyInfo();
    this.route.params.subscribe( (g: any) => {
      if (g.id !== undefined) {
        this.recruitmentService.getJobById(g.id).subscribe( ( obj: any) => {
          if (obj.data) {
            const date = new Date(obj.data.startDay);
            this.recruitmentModel = obj.data;
            this.isEdit = true;
            this.startDayLoad = {day: date.getDate(), month: Number(date.getMonth() + 1) , year: date.getFullYear()};
            this.categorysValue = [];
            this.locationValue = [];
            this.initSelectData();
          }
        });
      }
    });
    this.createForm();
    this.getAllCategory();
    this.commonData();
    this.options = {
      placeholder: 'Vui lòng chọn',
      multiple: true,
      maximumSelectionLength: 1
    };
  }
  private checkCompanyInfo() {
    this.companyInfoService.getCompanyByUser().subscribe((g: any) => {
      if (g) {
        if (g.data.name === null) {
          this.router.navigate(['/congty/thongtin']);
        }
      }
    })
  }
  private initSelectData() {
      if (this.isEdit) {
        this.categorysValue.push(this.recruitmentModel.categoryId);
        this.locationValue.push(this.recruitmentModel.locationId);
      }
  }

  saveData() {
    this.isSubmit = true;
    if (this.recruitmentForm.valid) {
      this.setDataRecruitmentModel();
      this.createOrUpdateRecruitment();
    }
  }
  createOrUpdateRecruitment() {
    this.recruitmentService.recruitmentModel = this.recruitmentModel;
    if (!this.isEdit) {
      this.recruitmentService.createRecruitment()
      .subscribe((g: any) => {
        this.router.navigate(['/congty']);
      }, (err) => {
        this.router.navigate(['/404']);
      });
    } else {
      this.recruitmentService.updateRecruitment()
      .subscribe((g: any) => {
        this.router.navigate(['/congty']);
      }, (err) => {
        this.router.navigate(['/404']);
      });
    }
  }
  get f() {
    return this.recruitmentForm.controls;
  }
  changedCategory(data: {value: string[]}) {
    this.categorysValue = data.value;
  }
  changedLocation(data: {value: string[]}) {
    this.locationValue = data.value;
  }
  get validMultiSelect() {
    if (this.locationValue.length === 0 || this.categorysValue.length === 0) {
      return false;
    }
    return true;
  }
  get validCategory() {
    if (this.categorysValue.length === 0) {
      return true;
    }
    return false;
  }
  get validLocation() {
    if (this.locationValue.length === 0) {
      return true;
    }
    return false;
  }

  private changeDropdownToSelect() {
    this.categorys = [];
    // tslint:disable-next-line:no-shadowed-variable
    this.categorysTemp.forEach(element => {
      this.categorys.push(this.parseCategoryToSelect(element));
    });
  }
/*   private parseDropdownToSelect(data: DropDown) {
    const select: Select2OptionData = {
      id: data.id,
      text: data.name
    };
    return select;
  } */
  private setDataRecruitmentModel() {
    const value = this.recruitmentForm.value;
    if (this.isEdit) {
      const temp = this.recruitmentModel;
      this.recruitmentModel = new RecruitmentModel(value);
      this.recruitmentModel.id = temp.id;
    } else {
      this.recruitmentModel = new RecruitmentModel(value);
    }
    if (this.locationValue.length > 0) {
      // tslint:disable-next-line:no-shadowed-variable
      this.locationValue.forEach( element => {
        const ddLocation = this.commonDataModels.city.find(x => x.id === element);
        this.recruitmentModel.locationId = element;
        /* const locationDropdown = new DropDown(ddLocation);
        this.recruitmentModel.locationIds.push(locationDropdown); */
      });
    }

    if (this.categorysValue.length > 0) {
      // tslint:disable-next-line:no-shadowed-variable
      this.categorysValue.forEach( element => {
        const ddcategorys = this.categorysTemp.find(x => x.id === element);
        this.recruitmentModel.categoryId = element;
        /* const categorysDropdown = new DropDown(ddcategorys);
        this.recruitmentModel.categoryIds.push(categorysDropdown); */
      });
    }

    const ddlevel = this.levels.find(x => x.id === value.level);
    const levelDropdown = new DropDown(ddlevel);
    this.recruitmentModel.level = levelDropdown;
    const today = new Date();
    this.recruitmentModel.startDay = new Date(Number(value.startDay.year), Number(value.startDay.month - 1), Number(value.startDay.day)
    , Number(today.getHours()), Number(today.getMinutes()), Number(today.getSeconds()));
    // tslint:disable-next-line:max-line-length
    this.recruitmentModel.expirationDate = new Date(Number(value.startDay.year), Number(value.startDay.month), Number(value.startDay.day)
    , Number(today.getHours()), Number(today.getMinutes()), Number(today.getSeconds()));
  }
  private changeDropdownToSelectLocation() {
    this.locations = [];
    this.locationTemp.forEach(element => {
      this.locations.push(this.parseCategoryToSelect(element));
    });

  }
  private parseCategoryToSelect(data: any) {
    const select: Select2OptionData = {
      id: data.id,
      text: data.name
    };
    return select;
  }
  private commonData() {
    this.commonService.getCommonData()
      .subscribe((g: any) => {
        if (g != null) {
          this.commonDataModels = g.data;
          this.jobTypeModels = g.data.typeOfWork;
          this.levels = g.data.levelOfWork;
          this.locationTemp = g.data.city;
          this.changeDropdownToSelectLocation();
          this.categorysValue = [];
          this.locationValue = [];
          this.initSelectData();
        }
      });
  }
  private createForm() {
    this.recruitmentForm = this.formBuilder.group({
      name: ['', Validators.required],
      jobType: ['', Validators.required],
      level: ['', Validators.required],
      salary: ['', Validators.required],
      description: ['', Validators.required],
      summary: ['', Validators.required],
      startDay: ['', Validators.required],
      isShowSalary: true,
    });
  }
  private getAllCategory() {
    this.commonService.getAllCategory()
      .subscribe((g: any) => {
        if (g != null) {
          this.categorysTemp = g.data;
          this.changeDropdownToSelect();
        }
      });
  }

}
