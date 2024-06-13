import { Component } from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {Button} from "primeng/button";

@Component({
  selector: 'g-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    Button
  ],
  templateUrl: './g-sidebar.component.html',
  styleUrl: './g-sidebar.component.css'
})
export class GSidebarComponent {
  sidebarVisible: boolean = false;

}
