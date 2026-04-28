import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegajosPageComponent } from './legajos-page.component';

describe('LegajosPageComponent', () => {
  let component: LegajosPageComponent;
  let fixture: ComponentFixture<LegajosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegajosPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegajosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
