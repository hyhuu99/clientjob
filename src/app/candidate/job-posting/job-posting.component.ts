import { Component, OnInit, Input } from '@angular/core';
import { JobQueryModel } from '../services/job/job-query.model';

@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.scss']
})
export class JobPostingComponent implements OnInit {
  @Input() jobQuery: JobQueryModel;
  constructor() { }

  ngOnInit() {
  }

}
