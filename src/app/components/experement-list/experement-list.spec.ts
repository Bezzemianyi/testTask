import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperementList } from './experement-list';

describe('ExperementList', () => {
  let component: ExperementList;
  let fixture: ComponentFixture<ExperementList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperementList],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperementList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
