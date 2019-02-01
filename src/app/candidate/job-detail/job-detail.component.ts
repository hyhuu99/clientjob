import { ResumeService } from './../services/resume-standard/resume.service';
import { ApplyService } from './../services/apply/apply.service';
import { Component, OnInit, Input } from '@angular/core';
import { JobDetailModel } from '@app/candidate/services/job/job-detail.model';
import { JobService } from '@app/candidate/services/job/job.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { JobTypeConstantsViet } from '../models/constants/job-type.constant';
import { CompanyInfoService } from '@app/company/services/companyInfo/company-info.service';
import { CompanyInfoModel } from '@app/company/services/companyInfo/companyInfo.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {
  @Input()
  public jobDetail: JobDetailModel;
  companyModel: CompanyInfoModel;
  flagShowHide: boolean;
  isShowSalary: boolean;
  startDayLoad: string;
  jobTypeName: string;
  modalReference: any;
  isApply = true;
  isShowCompany = true;
  methodSendCV = true;
  disableOptionCV = true;
  fileUpload: any;
  constructor(private jobService: JobService, private route: ActivatedRoute, private router: Router
    , private companyInfoService: CompanyInfoService, private modalService: NgbModal, private applyService: ApplyService
    , private resumeService: ResumeService) { }

  ngOnInit() {
    this.flagShowHide = true;
    this.isShowSalary = false;
    this.route.params.subscribe( (g: any) => {
      if (g) {
        this.IsExistApplyByJob(g.id);
        this.jobService.getJobsById(g.id).subscribe((data: any) => {
          if (data.data) {
            this.jobDetail = data.data;
            this.isShowSalary = this.jobDetail.isShowSalary;
            const date = new Date(data.data.startDay);
            this.jobTypeName = JobTypeConstantsViet.find(x => x.key === data.data.jobType).value;
            this.startDayLoad =  date.getDate() + '-' + Number(date.getMonth() + 1) + '-' + date.getFullYear();
            this.getCompany(this.jobDetail.companyId);
          }
        }, (err) => {
          this.router.navigate(['/404']);
        });
      }
    });
  }
  open(content) {
    this.modalReference = this.modalService.open(content);
  }
  apply( c) {
    this.applyService.applyModel.jobId = this.jobDetail.id;
    this.applyService.applyModel.email = '';
    this.applyService.applyModel.fileCv = this.fileUpload;
    this.resumeService.setOrgResmue().subscribe( (g: any) => {
      if (g.data) {
        this.applyService.createApply().subscribe( ( data: any) => {
          this.isApply = false;
        }, (err) => {
          this.router.navigate(['/404']);
        });
      } else {
        this.router.navigate(['/hoso']);
        
      }
    });

    c('close modal');
  }
  public switch(event) {
    if (this.flagShowHide !== event) {
      this.flagShowHide = event;
    }
  }
  private getCompany(companyId) {
    this.companyInfoService.getCompanyById(companyId).subscribe( (g: any) => {
      if (g.data) {
        this.companyModel = g.data;
        this.isShowCompany = g.data.isShow;
      }
    }, (err) => {
      this.router.navigate(['/404']);
    });
  }
  public changeInput(cond) {
    if (cond) {
      this.disableOptionCV = false;
    } else {
      this.disableOptionCV = true;
    }
  }
  processFile(fileInput: any) {
    const file: File = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    this.fileUpload = file;
  }

  private IsExistApplyByJob(jobId) {
    this.applyService.IsExistApplyByJob(jobId).subscribe( (g: any) => {
      if (g) {
        if (g.data) {
          this.isApply = false;
        }
      }
    }, (err) => {
      this.router.navigate(['/404']);
    });
  }

}
