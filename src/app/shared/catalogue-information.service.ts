import {Injectable} from '@angular/core';
import {createClient} from "@hey-api/client-fetch";
import {getUiConfiguration, search, SearchResponse, UiSetting} from "../../gapi";
import {BehaviorSubject, filter, map, Observable} from "rxjs";
import {
  SearchHitsMetadata
} from "@elastic/elasticsearch/lib/api/types";

@Injectable({
  providedIn: 'root'
})
export class CatalogueInformationService {
  private recordsStatistics$: BehaviorSubject<SearchResponse>;
  private latestRecords$: BehaviorSubject<SearchResponse>;
  private uiConfiguration$: BehaviorSubject<UiSetting>;

  constructor() {
    createClient({
      baseUrl: "http://localhost:8080/geonetwork/srv/api/",
    });
    this.recordsStatistics$ = new BehaviorSubject<SearchResponse>({} as SearchResponse);
    this.latestRecords$ = new BehaviorSubject<SearchResponse>({} as SearchResponse);
    this.uiConfiguration$ = new BehaviorSubject<UiSetting>({} as UiSetting);
    this._getUiConfiguration();
    this._getRecordsStatistics();
    this._getLatestRecords();
  }

  getUiConfiguration(): Observable<any> {
    return this.uiConfiguration$.pipe(
      // TODO: default configuration
      map(r => r.configuration ? JSON.parse(r.configuration) as UiSetting: {})
    );
  }
  getRecordStatisticsHits(): Observable<SearchHitsMetadata<any>> {
    return this.recordsStatistics$.pipe(
      map(r => r.hits)
    );
  }

  getRecordStatisticsAggs(): Observable<any> {
    return this.recordsStatistics$.pipe(
      map(r => r.aggregations || {})
    );
  }

  getLatestRecords(): Observable<SearchResponse> {
    return this.latestRecords$.pipe(
      map(r => r)
    );
  }


  private _getUiConfiguration() {
    getUiConfiguration({uiIdentifier: "srv"}).then(response => {
      this.uiConfiguration$.next(response);
    });
  }

  private _getRecordsStatistics() {
    search({
      requestBody: {
        track_total_hits: true,
        aggregations: {
          isTemplate: {
            terms: {
              field: "isTemplate"
            }
          },
          resourceType: {
            terms: {
              field: "resourceType"
            }
          },
        },
        query: {
          query_string: {
            query: "*"
          }
        }
      }
    }).then(response => {
      this._setRecordsStatistics(response);
    })
  }
  private _setRecordsStatistics(response: SearchResponse) {
    this.recordsStatistics$.next(response);
  }


  private _getLatestRecords() {
    search({
      requestBody: {
        track_total_hits: true,
        sort: [{"changeDate": "desc"}],
        _source: ["resourceTitleObject", "overview", "changeDate", "uuid"],
        query: {
          query_string: {
            query: "*"
          }
        }
      }
    }).then(response => {
      this._setLatestRecords(response);
    })
  }
  private _setLatestRecords(response: SearchResponse) {
    this.latestRecords$.next(response);
  }
}

