import { TestBed } from '@angular/core/testing';

import { WidgetUtilService } from './widget-util.service';

describe('WidgetUtilService', () => {
  let service: WidgetUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
