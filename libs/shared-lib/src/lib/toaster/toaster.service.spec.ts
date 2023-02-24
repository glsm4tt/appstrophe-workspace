import { Overlay } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';

import { ToasterService } from './toaster.service';

describe('ToasterService', () => {
  let service: ToasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Overlay]
    });
    service = TestBed.inject(ToasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
