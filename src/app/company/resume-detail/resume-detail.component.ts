import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '@app/candidate/services/resume-standard/resume.service';
import { ResumesModel } from '@app/candidate/services/resume-standard/resumes.model';
@Component({
  selector: 'app-resume-detail',
  templateUrl: './resume-detail.component.html',
  styleUrls: ['./resume-detail.component.scss']
})
export class ResumeDetailComponent implements OnInit {

  @Input()
  resumeModel = new ResumesModel();
  constructor(private router: Router, private resumeService: ResumeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( (g: any) => {
      if (g) {
        this.getResumeById(g.id);
      }
    });
  }
  private getResumeById(id) {
    this.resumeService.getResumeById(id).subscribe( (g: any) => {
      if (g) {
        this.resumeModel = g.data;
      }
    });
  }

}
