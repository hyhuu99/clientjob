import { Component, OnInit } from '@angular/core';
import { RecruitmentService } from '../services/recruitment/recruitment.service';
import { CompanyInfoService } from '@app/company/services/companyInfo/company-info.service';
import { Router } from '@angular/router';
import { RecruitmentModel } from '@app/company/services/recruitment/recruitment.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})


export class HomePageComponent implements OnInit {
  companyId: string;
  listRecruitment: RecruitmentModel[];
  pagesItems: any[];
  pageSize = 6;
  curPage = 0;
  closeResult: string;
  modalReference: any;
  constructor(private recruitmentService: RecruitmentService, private companyInfoService: CompanyInfoService, private router: Router,
     private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getCompany();
  }
  open(content) {
    this.modalReference = this.modalService.open(content);
  }
  delete(id,c) {
    this.recruitmentService.deleteRecruitment(id).subscribe((g: any) => {
      this.listRecruitment.forEach( (item, index) => {
        if (item.id === id) {
          this.listRecruitment.splice(index, 1);
        }
      });
      this.setPage(this.curPage);
    }, (err) => {
      this.router.navigate(['/404']);
    });
    c('close modal');
  }
  getJobByCompany() {
    this.recruitmentService.getJobByCompany(this.companyId).subscribe( (g: any) => {
      if (g) {
        this.listRecruitment = g;
        this.listRecruitment.forEach(element => {
          const date = new Date(element.expirationDate);
          element.dateToString = date.getDate() + '-' + Number(date.getMonth() + 1) + '-' +
          date.getFullYear();
        });
        this.setPage(this.curPage);
      }
    });
  }
  setPage(page: number) {
    // get current page of items
    const startIndex = page * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.listRecruitment.length );
    this.pagesItems = this.listRecruitment.slice(startIndex, endIndex);
  }
  numberOfPages() {
    return Math.ceil(this.listRecruitment.length / this.pageSize);
  }

  getCompany() {
    this.companyInfoService.getCompanyByUser().subscribe((g: any) => {
      if ( g.data !== null) {
        this.companyId = g.data.id;
        this.getJobByCompany();
      }
    }, (err) => {
      this.router.navigate(['/404']);
    });
  }

}
