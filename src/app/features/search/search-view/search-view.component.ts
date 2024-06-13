import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {SearchService} from "../../../shared/search.service";
import {Observable} from "rxjs";
import {AsyncPipe, DatePipe, JsonPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {CheckboxModule} from "primeng/checkbox";
import {DataViewModule} from "primeng/dataview";
import {ImageModule} from "primeng/image";
import {ScrollTopModule} from "primeng/scrolltop";
import {CatalogueInformationService} from "../../../shared/catalogue-information.service";
import {MultiSelectModule} from "primeng/multiselect";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {PaginatorModule} from "primeng/paginator";
import {Button, ButtonDirective} from "primeng/button";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {InputTextModule} from "primeng/inputtext";
import {FieldsetModule} from "primeng/fieldset";
import {BadgeModule} from "primeng/badge";
import {ChipModule} from "primeng/chip";

@Pipe({
  name: 'gAggsFilter',
  standalone: true,
  pure: false
})
export class GAggsFilterPipe implements PipeTransform {
  transform(aggs: any[], aggsConfiguration: any, metaProperty: string, value: string | boolean): any {
    if (!aggs || !aggsConfiguration) {
      return aggs;
    }
    return aggs.filter(a =>
      aggsConfiguration[a.key]?.meta?.[metaProperty] === value)
  }
}

interface RangeField {
  gte: number,
  lte: number
}

@Pipe({
  name: 'gFieldRangeRenderer',
  standalone: true,
  pure: false
})
export class GFieldRangeRenderer implements PipeTransform {
  constructor(private date: DatePipe) {
  }
  transform(range: RangeField, format: string): string {
    if (!range) {
      return "";
    }
    if (range.gte === range.lte) {
      return <string>this.date.transform(range.gte, format);
    }
    return `${this.date.transform(range.gte, format)} to ${this.date.transform(range.lte, format)}`
  }
}


@Component({
  selector: 'g-search-view',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    KeyValuePipe,
    NgForOf,
    RouterLink,
    CheckboxModule,
    DataViewModule,
    ImageModule,
    NgIf,
    ScrollTopModule,
    MultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    PaginatorModule,
    Button,
    OverlayPanelModule,
    InputTextModule,
    ButtonDirective,
    GAggsFilterPipe,
    FieldsetModule,
    BadgeModule,
    GFieldRangeRenderer,
    ChipModule
  ],
  providers: [DatePipe],
  templateUrl: './search-view.component.html',
  styleUrl: './search-view.component.css'
})
export class SearchViewComponent implements OnInit {
  protected searchHits$: Observable<any> =
    new Observable<any[]>()
  protected uiConfiguration$: Observable<any> =
    new Observable<any[]>()

  protected aggsConfiguration: any = {}
  protected query: string = ""

  selectedBuckets: Record<string, any[]> = {};
  protected queryInput: FormControl = new FormControl()

  constructor(private searchService: SearchService,
              private catalogueInformationService: CatalogueInformationService) {

  }

  ngOnInit() {
    this.uiConfiguration$ = this.catalogueInformationService.getUiConfiguration();

    this.uiConfiguration$.subscribe(ui => {
      this.aggsConfiguration = ui.mods?.search?.facetConfig || {};
      Object.keys(this.aggsConfiguration).forEach(key => {
        this.selectedBuckets[key] = [];
      });
      this.searchService.search(this.query, this.aggsConfiguration)
    });

    this.queryInput.valueChanges.subscribe(value => {
      this.query = value;
      this.searchService.search(this.query, this.aggsConfiguration)
    })

    this.searchHits$ = this.searchService.getSearchHits()
  }
}
