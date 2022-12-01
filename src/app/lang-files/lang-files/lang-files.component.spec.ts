import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LangFilesComponent } from './lang-files.component';

describe('LangFilesComponent', () => {
  let component: LangFilesComponent;
  let fixture: ComponentFixture<LangFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
