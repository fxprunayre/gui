import {Component, Input, OnInit} from '@angular/core';
import Papa from 'papaparse';

@Component({
    selector: 'g-data-table',
    templateUrl: './data-table.component.html',
    styleUrl: './data-table.component.css'
})
export class DataTableComponent implements OnInit {
    @Input("source")
    source: string | undefined = undefined;

    data!: Array<any>;

    loading: boolean = false;

    constructor() {
    }

    parseCsv(source: string) {
        Papa.parse(source, {
            download: true,
            complete: (results, file) => {
                if (results.errors.length) {
                    console.error("Errors while parsing:", results.errors);
                } else {
                    this.data = results.data;
                }
            }
        });
    }

    ngOnInit() {
        if (this.source) {
            this.parseCsv(this.source);
        }
    }
}
