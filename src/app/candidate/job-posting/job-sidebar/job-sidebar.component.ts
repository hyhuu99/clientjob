import { Component, OnInit } from '@angular/core';
import { JobService } from '@app/candidate/services/job/job.service';
import { JobLocations } from '@app/candidate/services/job/job-locations.model';
import { JobCategories } from '@app/candidate/services/job/job-categories.model';
import { JobDetailModel } from '@app/candidate/services/job/job-detail.model';
import { JobQueryModel } from '@app/candidate/services/job/job-query.model';

@Component({
  selector: 'app-job-sidebar',
  templateUrl: './job-sidebar.component.html',
  styleUrls: ['./job-sidebar.component.scss']
})
export class JobSidebarComponent implements OnInit {
  public jobLocations: JobLocations[];
  public jobCategories: JobCategories[];
  public jobList: JobDetailModel[];
  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.jobService.getJobLocations().subscribe(data => {
      if (data) {
        this.jobLocations = data;
      }
    });

    this.jobService.getJobCategories().subscribe(data => {
      if (data) {
        this.jobCategories = data;
      }
    });


    this.jobService.getJobs(new JobQueryModel()).subscribe(data => {
      if (data) {
        this.jobList = data;
      }
    });
  }

}
