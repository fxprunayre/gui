import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component';
import {TableModule} from "primeng/table";
import {IconFieldModule} from "primeng/iconfield";
import {InputIconModule} from "primeng/inputicon";
import {MultiSelectModule} from "primeng/multiselect";
import {TagModule} from "primeng/tag";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";



@NgModule({
    declarations: [
        DataTableComponent
    ],
    exports: [
        DataTableComponent
    ],
    imports: [
        CommonModule,
        TableModule,
        IconFieldModule,
        InputIconModule,
        MultiSelectModule,
        TagModule,
        DropdownModule,
        FormsModule,
        InputTextModule
    ]
})
export class DataModule { }
