import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {SearchHit} from "@elastic/elasticsearch/lib/api/types";
import {DatePipe, JsonPipe, NgIf} from "@angular/common";
import {InputGroupModule} from "primeng/inputgroup";
import {TimelineModule} from "primeng/timeline";
import {ScrollTopModule} from "primeng/scrolltop";
import {GalleriaModule} from "primeng/galleria";
import {ImageModule} from "primeng/image";
import {DataModule} from "../../data/data.module";

@Pipe({
  name: 'gGetApiLinks',
  standalone: true,
  pure: false
})
export class GGetApiLinks implements PipeTransform {
  transform(links: any[]): any {
    if (!links) {
      return links;
    }
    return links.filter(link =>
        link.protocol.match(/OGC:.*/i))
  }
}

@Pipe({
  name: 'gGetOtherLinks',
  standalone: true,
  pure: false
})
export class GGetOtherLinks implements PipeTransform {
  transform(links: any[]): any {
    if (!links) {
      return links;
    }
    return links.filter(link =>
        !link.protocol.match(/OGC:.*/i))
  }
}

@Component({
  selector: 'g-record-view',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    JsonPipe,
    InputGroupModule,
    NgIf,
    TimelineModule,
    DatePipe,
    ScrollTopModule,
    GalleriaModule,
    ImageModule,
    GGetApiLinks,
    GGetOtherLinks,
    DataModule
  ],
  templateUrl: './record-view.component.html',
  styleUrl: './record-view.component.css'
})
export class RecordViewComponent implements OnInit{

  @Input() record: SearchHit<any> | undefined;

  constructor() { }

  ngOnInit() {
    this.record = history.state;
  }
}
