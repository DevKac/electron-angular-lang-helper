import { TestBed, inject } from '@angular/core/testing';

import { LangFilesService } from './lang-files.service';

describe('LangFilesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LangFilesService]
    });
  });

  it('should be created', inject([LangFilesService], (service: LangFilesService) => {
    expect(service).toBeTruthy();
  }));
});
