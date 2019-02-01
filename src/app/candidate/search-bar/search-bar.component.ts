import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { JobService } from '../services/job/job.service';
import { Location } from '../services/job/location.model';
import { Category } from '../services/job/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import ParseObjectHelper from '@app/shared/helpers/parse-filter-object.helper';
import { JobQueryModel } from '../services/job/job-query.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnChanges, OnInit {
  @Input() jobQuery: JobQueryModel;

  public locations: Location[];
  public categories: Category[];

  public isLocationSelect: boolean;
  public isCategorySelect: boolean;
  public currentLocation: Location;
  public currentCategory: Category;
  public searchText: string;

  public defaultLocation = new Location({ name: 'Chọn địa điểm' });
  public defaultCategory = new Category({ name: 'Chọn ngành nghề' });

  private hadInitData: boolean;

  constructor(private jobService: JobService, private router: Router) {
    this.searchText = '';
    this.currentLocation = new Location({ name: 'Chọn địa điểm' });
    this.currentCategory = new Category({ name: 'Chọn ngành nghề' });
    this.locations = [];
    this.categories = [];
  }

  ngOnInit() {
    if (!this.hadInitData) {
      this.hadInitData = true;
      this.initData()
    }
  }

  ngOnChanges() {
    if (this.locations && this.locations.length > 0) {
      if (this.jobQuery) {
        const location = this.locations.find(x => x.id === this.jobQuery.locationId);
        this.currentLocation = location ? location : this.defaultLocation;
      }
    }
    if (this.categories && this.categories.length > 0) {
      if (this.jobQuery) {
        const category = this.categories.find(x => x.id === this.jobQuery.categoryId);
        this.currentCategory = category ? category : this.defaultCategory;
      }
    }
    if (!this.hadInitData) {
      this.hadInitData = true;
      this.initData()
    }
  }

  private initData() {
    this.jobService.getLocations().subscribe(data => {
      if (data) {
        this.locations = data;
        if (this.jobQuery) {
          const location = this.locations.find(x => x.id === this.jobQuery.locationId);
          this.currentLocation = location ? location : this.defaultLocation;
        }
      }
    });
    
    this.jobService.getCategories().subscribe(data => {
      if (data) {
        this.categories = data;
        if (this.jobQuery) {
          const category = this.categories.find(x => x.id === this.jobQuery.categoryId);
          this.currentCategory = category ? category : this.defaultCategory;
        }
      }
    });

    if (this.jobQuery) {
      this.searchText = this.jobQuery.searchText;
    }
  }

  public selectLocation(event: any, location?: Location) {
    this.isLocationSelect = !this.isLocationSelect;
    if (location) {
      this.currentLocation = location;
      event.stopPropagation();
    }
  }

  public selectCategory(event: any, category?: Category) {
    this.isCategorySelect = !this.isCategorySelect;
    if (category) {
      this.currentCategory = category;
      event.stopPropagation();
    }
  }

  public search() {
    this.searchText = this.searchText ? this.searchText.trim() : '';
    const queryParams = new JobQueryModel({
      searchText: this.searchText,
      locationId: this.currentLocation.id,
      categoryId: this.currentCategory.id
    });
    const params = ParseObjectHelper.parseObject(queryParams, []);
    this.router.navigate(['/timviec'], { queryParams: params });
  }
}
