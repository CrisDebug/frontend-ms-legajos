import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsuariosPageComponent } from './admin-usuarios-page.component';

describe('AdminUsuariosPageComponent', () => {
  let component: AdminUsuariosPageComponent;
  let fixture: ComponentFixture<AdminUsuariosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUsuariosPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUsuariosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
