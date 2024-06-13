import { TestBed } from '@angular/core/testing';

import { CatalogueInformationService } from './catalogue-information.service';

describe('CatalogueInformationService', () => {
  let service: CatalogueInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogueInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
