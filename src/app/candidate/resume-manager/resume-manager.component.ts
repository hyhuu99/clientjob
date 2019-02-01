import { Component, OnInit } from '@angular/core';
import { ResumeService } from '@app/candidate/services/resume-standard/resume.service';
import { ResumesModel } from '@app/candidate/services/resume-standard/resumes.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resume-manager',
  templateUrl: './resume-manager.component.html',
  styleUrls: ['./resume-manager.component.scss']
})
export class ResumeManagerComponent implements OnInit {
  resumeModel = new ResumesModel();
  isCvExist = false;
  constructor(private resumeService: ResumeService,private router: Router) {
  }

  ngOnInit() {
    this.resumeService.setOrgResmue()
    .subscribe((g: any) => {
      if (g.data !== null) {
        this.resumeService.resumeModel = g.data;
        this.resumeModel = g.data;
        this.isCvExist = true;
      }
    }, (err) => {
      this.router.navigate(['/404']);
    });
  }

}
