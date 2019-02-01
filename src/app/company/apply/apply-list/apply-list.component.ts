import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApplyService } from '@app/candidate/services/apply/apply.service';
@Component({
  selector: 'app-apply-list',
  templateUrl: './apply-list.component.html',
  styleUrls: ['./apply-list.component.scss']
})
export class ApplyListComponent implements OnInit {
  @Input()
  public applyList: any = [];
  pagesItems: any[];
  pageSize = 6;
  curPage = 0;
  constructor(private router: Router, private applyService: ApplyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( (g: any) => {
      if (g) {
        this.getListApply(g.id);
      }
    });
  }

  private getListApply(jobId) {
    this.applyService.getApplyByJob(jobId).subscribe( (g: any) => {
      if (g) {
        this.applyList = g.data;
        this.applyList.forEach(element => {
          const date = new Date(element.appliedDate);
          element.dateToString = date.getDate() + '-' + Number(date.getMonth() + 1) + '-' +
          date.getFullYear();
        });
        this.setPage(this.curPage);
      }
    }, (err) => {
      this.router.navigate(['/404']);
    });
  }

  setPage(page: number) {
    // get current page of items
    const startIndex = page * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.applyList.length );
    this.pagesItems = this.applyList.slice(startIndex, endIndex);
  }

  numberOfPages() {
    return Math.ceil(this.applyList.length / this.pageSize);
  }
}
