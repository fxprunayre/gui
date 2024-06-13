import { bootstrapApplication } from '@angular/platform-browser';
import { GConfig } from './app/g.config';
import { GComponent } from './app/g.component';

bootstrapApplication(GComponent, GConfig)
  .catch((err) => console.error(err));
