import { Component, OnInit } from '@angular/core';
import { JobTypeEnum } from '../models/enums/job-type.enum';
import { JobService } from '../services/job/job.service';
import { JobDetailModel } from '../services/job/job-detail.model';
import { JobQueryModel } from '../services/job/job-query.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  public jobList: JobDetailModel[];
  public jobQuery: JobQueryModel;
  constructor(private jobService: JobService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.jobQuery = new JobQueryModel({
        searchText: params['searchText'],
        categoryId: params['categoryId'],
        locationId: params['locationId']
      });
    });
  }
}
