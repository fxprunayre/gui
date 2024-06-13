import {Component, Input, OnInit} from '@angular/core';
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {SearchHit} from "@elastic/elasticsearch/lib/api/types";
import {DatePipe, JsonPipe, NgIf} from "@angular/common";
import {InputGroupModule} from "primeng/inputgroup";
import {TimelineModule} from "primeng/timeline";
import {ScrollTopModule} from "primeng/scrolltop";
import {GalleriaModule} from "primeng/galleria";
import {ImageModule} from "primeng/image";

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
    ImageModule
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
