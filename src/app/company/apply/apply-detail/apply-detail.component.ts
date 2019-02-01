import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApplyService } from '@app/candidate/services/apply/apply.service';
import { ResumesModel } from '@app/candidate/services/resume-standard/resumes.model';
@Component({
  selector: 'app-apply-detail',
  templateUrl: './apply-detail.component.html',
  styleUrls: ['./apply-detail.component.scss']
})
export class ApplyDetailComponent implements OnInit {
  @Input()
  public applyList: any = [];
  resumeModel = new ResumesModel();
  constructor(private router: Router, private applyService: ApplyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( (g: any) => {
      if (g) {
        this.getApplyById(g.id);
      }
    });
  }

  private getApplyById(applyId) {
    this.applyService.getApplyById(applyId).subscribe( (g: any) => {
      if (g) {
        this.resumeModel = g.data.resume;
      }
    }, (err) => {
      this.router.navigate(['/404']);
    });
  }

}
