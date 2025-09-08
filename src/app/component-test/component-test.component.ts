import {Component, ViewEncapsulation} from '@angular/core';
import {Button} from 'primeng/button';
import {GcShadowdomstyleComponent} from '../gc-shadowdomstyle-component';
import {Toast} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Select} from 'primeng/select';
import {FormsModule} from '@angular/forms';
import {DatePicker} from 'primeng/datepicker';

@Component({
  selector: 'app-component-test',
  imports: [
    Button,
    Toast,
    ConfirmDialog,
    Select,
    FormsModule,
    DatePicker
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './component-test.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ComponentTest extends GcShadowdomstyleComponent {
  cities = [{name: 'New York', code: 'NY'}, {name: 'Rome', code: 'RM'}, {name: 'London', code: 'LDN'}, {name: 'Istanbul', code: 'IST'}, {name: 'Paris', code: 'PRS'}];
  selectedCity: any = null;
  date: any= null;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {
    super();
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Save',
      },
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }
}
