import {Component, OnInit, WritableSignal} from '@angular/core';
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";
import {SpeedDialModule} from "primeng/speeddial";
import {MenuItem, MessageService} from "primeng/api";
import {SidebarModule} from "primeng/sidebar";

@Component({
  selector: 'g-header',
  standalone: true,
  imports: [
    Button,
    RouterLink,
    SpeedDialModule,
    SidebarModule
  ],
  providers: [MessageService],
  templateUrl: './g-header.component.html',
  styleUrl: './g-header.component.css'
})
export class GHeaderComponent implements OnInit  {
  userMenu: MenuItem[] | undefined;
  settingsMenu: MenuItem[] | undefined;
  protected sidebarVisible: boolean | WritableSignal<boolean> = false

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.userMenu = [
      {
        icon: 'fa fa-star',
        title: 'Favorite searches',
        command: () => {
          this.sidebarVisible = !this.sidebarVisible;
        }
      },
      {
        icon: 'fa fa-pencil',
        command: () => {
          this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
        }
      },
      {
        icon: 'fa fa-refresh',
        command: () => {
          this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
        }
      }
    ];

    this.settingsMenu = [
      {
        icon: 'fa fa-cloud'
      },
      {
        icon: 'fa fa-tag',
        command: () => {
          this.messageService.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
        }
      },
      {
        icon: 'fa fa-file',
        command: () => {
          this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
        }
      }
    ];
  }

}
