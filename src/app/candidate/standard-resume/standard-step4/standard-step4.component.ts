import { Component, OnInit } from '@angular/core';
import { ResumeService } from '@app/candidate/services/resume-standard/resume.service';
import { ResumesModel } from '@app/candidate/services/resume-standard/resumes.model';
@Component({
  selector: 'app-standard-step4',
  templateUrl: './standard-step4.component.html',
  styleUrls: ['./standard-step4.component.scss']
})
export class StandardStep4Component implements OnInit {

  resumeModel = new ResumesModel();
  imageSrc: string;
  constructor(private resumeService: ResumeService) {
  }

  ngOnInit() {
    this.resumeService.setOrgResmue()
    .subscribe((g: any) => {
      if (g.data !== null) {
        this.resumeService.resumeModel = g.data;
        this.resumeModel = g.data;
        this.imageSrc = this.resumeModel.contactInfo.image;
      }
    });
  }

}
