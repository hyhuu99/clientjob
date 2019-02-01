import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { JobDetailModel } from '@app/candidate/services/job/job-detail.model';
import { Subject } from 'rxjs';
import { JobService } from '@app/candidate/services/job/job.service';
import { JobTypeConstants } from '@app/candidate/models/constants/job-type.constant';
import { JobTypeEnum } from '@app/candidate/models/enums/job-type.enum';
import { JobQueryModel } from '@app/candidate/services/job/job-query.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnChanges {
  @Input() jobQuery: JobQueryModel;
  public jobList: JobDetailModel[];
  public isLoadedAll: boolean;
  public queryParams: JobQueryModel;
  constructor(private jobService: JobService) {
  }

  ngOnChanges() {
    this.jobList = [];
    this.queryParams = this.jobQuery ? _.cloneDeep(this.jobQuery) : new JobQueryModel();
    this.queryParams.pageIndex = 1;
    this.loadJob();
  }

  public jobTypeFilter(jobType?: JobTypeEnum) {
    this.jobList = [];
    this.queryParams.pageIndex = 1;
    this.queryParams.jobType = jobType;
    this.loadJob();
  }
  public loadMore() {
    this.queryParams.pageIndex += 1;
    this.loadJob();
  }
  private loadJob() {
    this.jobService.getJobs(this.queryParams).subscribe(data => {
      if (data) {
        data.forEach(item => this.jobList.push(item));
        this.isLoadedAll = data.length < 5;
      }
    });
  }
}
