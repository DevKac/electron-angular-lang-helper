import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LangDataHolderComponent } from './lang-data-holder.component';

describe('LangDataHolderComponent', () => {
  let component: LangDataHolderComponent;
  let fixture: ComponentFixture<LangDataHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangDataHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LangDataHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
