
import { Component, OnInit, Input } from '@angular/core';
import {RecruitmentModel} from '@app/company/services/recruitment/recruitment.model';
import { CommonService } from '@app/candidate/services/common/common.service';
import { DropDown } from '@app/candidate/models/DropDown';
import { RecruitmentService } from '../services/recruitment/recruitment.service';
import { Select2OptionData } from 'ng2-select2';
import { Router } from '@angular/router';
import { ResumeService } from '@app/candidate/services/resume-standard/resume.service';
import { SearchResume } from '@app/candidate/services/resume-standard/searchResume.model';
@Component({
  selector: 'app-search-candidate',
  templateUrl: './search-candidate.component.html',
  styleUrls: ['./search-candidate.component.scss']
})
export class SearchCandidateComponent implements OnInit {
  @Input()
  options: Select2Options;
  categorys: any[];
  locations: any[];
  levels: any[];
  categorysTemp: any[];
  locationTemp: any[];
  locationValue: any[] = [];
  categorysValue: any[] = [];
  levelValue = '';
  titleValue = '';
  searchResume: any;
  resumeList: any[];
  pagesItems: any[];
  pageSize = 6;
  curPage = 0;
  matchResume = 0;
  isSearch = false;
  constructor(
     private router: Router, private commonService: CommonService, private recruitmentService: RecruitmentService
     , private resumeService: ResumeService) { }

  ngOnInit() {
    this.options = {
      placeholder: 'Vui lòng chọn',
      multiple: true,
      maximumSelectionLength: 3
    };
    this.getAllCategory();
    this.commonData();
  }
  searchBtt() {
    this.search();
  }
  private changeDropdownToSelectLocation() {
    this.locations = [];
    this.locationTemp.forEach(element => {
      this.locations.push(this.parseCategoryToSelect(element));
    });
  }
  private search() {
    let searchModel = new SearchResume(this.searchResume);
    searchModel.title = this.titleValue;
    searchModel.level = this.levelValue;
    searchModel.categoryIds = this.categorysValue;
    searchModel.locationIds = this.locationValue;
    this.isSearch = true;
    this.resumeService.searchResume(searchModel).subscribe( (g: any) => {
      if (g) {
        this.resumeList = g.data;
        this.setPage(this.curPage);
      }
      if (this.resumeList.length > 0) {
        this.matchResume = this.resumeList.length;
      } else {
        this.matchResume = 0;
      }
    });
  }
  setPage(page: number) {
    // get current page of items
    const startIndex = page * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.resumeList.length );
    this.pagesItems = this.resumeList.slice(startIndex, endIndex);
  }

  numberOfPages() {
    return Math.ceil(this.resumeList.length / this.pageSize);
  }
  private commonData() {
    this.commonService.getCommonData()
      .subscribe((g: any) => {
        if (g != null) {
          this.levels = g.data.levelOfWork;
          this.locationTemp = g.data.city;
          this.changeDropdownToSelectLocation();
        }
      });
  }
  private parseCategoryToSelect(data: any) {
    const select: Select2OptionData = {
      id: data.id,
      text: data.name
    };
    return select;
  }
  changedCategory(data: {value: string[]}) {
    this.categorysValue = data.value;
  }
  changedLocation(data: {value: string[]}) {
    this.locationValue = data.value;
  }

  private changeDropdownToSelect() {
    this.categorys = [];
    // tslint:disable-next-line:no-shadowed-variable
    this.categorysTemp.forEach(element => {
      this.categorys.push(this.parseCategoryToSelect(element));
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
