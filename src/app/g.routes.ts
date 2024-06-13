import {Routes} from '@angular/router';
import {HomeViewComponent} from "./features/home/home-view/home-view.component";
import {SearchViewComponent} from "./features/search/search-view/search-view.component";
import {RecordViewComponent} from "./features/search/record-view/record-view.component";

export const routes: Routes = [{
  path: 'home',
  component: HomeViewComponent
},
  {
    path: 'search',
    component: SearchViewComponent
  },
  {
    path: 'metadata/:uuid',
    component: RecordViewComponent
  }, {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'landing'
  }];
