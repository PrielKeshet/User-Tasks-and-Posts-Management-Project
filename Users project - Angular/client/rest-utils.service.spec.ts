import { TestBed } from '@angular/core/testing';

import { RestUtilsService } from './rest-utils.service';

describe('RestUtilsService', () => {
  let service: RestUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
