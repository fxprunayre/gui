import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Button} from "primeng/button";
import {Observable} from "rxjs";
import {CatalogueInformationService} from "../../../shared/catalogue-information.service";
import {AsyncPipe, JsonPipe, KeyValuePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {BadgeModule} from "primeng/badge";
import {TimelineModule} from "primeng/timeline";

@Component({
  selector: 'g-home-view',
  standalone: true,
  imports: [
    RouterLink,
    Button,
    AsyncPipe,
    NgForOf,
    NgIf,
    JsonPipe,
    KeyValuePipe,
    BadgeModule,
    TimelineModule,
    NgStyle
  ],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.css'
})
export class HomeViewComponent {

  protected statAggs$: Observable<any> =
    new Observable<any[]>()
  protected latestRecords$: Observable<any> =
    new Observable<any[]>()


  constructor(private catalogueInformationService: CatalogueInformationService) {
  }

  ngOnInit() {
    this.statAggs$ = this.catalogueInformationService.getRecordStatisticsAggs();
    this.latestRecords$ = this.catalogueInformationService.getLatestRecords();
  }

}
