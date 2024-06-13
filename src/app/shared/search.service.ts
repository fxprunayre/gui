import { Injectable } from '@angular/core';
import {search, SearchResponse} from "../../gapi";
import {BehaviorSubject} from "rxjs";
import {AggregationsAggregate} from "@elastic/elasticsearch/lib/api/types";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchResults$: BehaviorSubject<SearchResponse>;

  constructor() {
    this.searchResults$ = new BehaviorSubject<SearchResponse>({} as SearchResponse);
  }

  public getSearchHits() {
    return this.searchResults$;
  }

  public search(query: string, aggs?: any) {
    search({
      requestBody: {
        track_total_hits: true,
        aggregations: aggs,
        query: {
          query_string: {
            query: query || "*"
          }
        }
      }
    }).then(response => {
      this.searchResults$.next(response);
    })
  }
}
