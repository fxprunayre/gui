import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CatalogueInformationService} from "./shared/catalogue-information.service";
import {Button} from "primeng/button";
import {GHeaderComponent} from "./shared/layouts/g-header/g-header.component";
import {GSidebarComponent} from "./shared/layouts/g-sidebar/g-sidebar.component";
import {Observable} from "rxjs";
import {SearchResponse} from "../gapi";
import {AggregationsAggregate} from "@elastic/elasticsearch/lib/api/types";

@Component({
  selector: 'g-root',
  standalone: true,
  imports: [RouterOutlet, Button, GHeaderComponent, GSidebarComponent],
  templateUrl: './g.component.html',
  styleUrl: './g.component.css'
})
export class GComponent {
  title = 'gui';

}
