import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegajosListComponent } from './legajos-list.component';

describe('LegajosListComponent', () => {
  let component: LegajosListComponent;
  let fixture: ComponentFixture<LegajosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegajosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegajosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
