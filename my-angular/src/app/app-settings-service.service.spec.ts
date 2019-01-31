import { TestBed, inject } from '@angular/core/testing';

import { AppSettingsServiceService } from './app-settings-service.service';

describe('AppSettingsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppSettingsServiceService]
    });
  });

  it('should be created', inject([AppSettingsServiceService], (service: AppSettingsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
