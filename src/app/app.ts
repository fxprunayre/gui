import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {WebComponentTest} from './web-component-test/web-component-test.component';
import {FormsModule} from '@angular/forms';
import {ComponentTest} from './component-test/component-test.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, WebComponentTest, ComponentTest],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('primeng20');
}
