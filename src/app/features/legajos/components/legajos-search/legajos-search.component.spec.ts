import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegajosSearchComponent } from './legajos-search.component';

describe('LegajosSearchComponent', () => {
  let component: LegajosSearchComponent;
  let fixture: ComponentFixture<LegajosSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegajosSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegajosSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
