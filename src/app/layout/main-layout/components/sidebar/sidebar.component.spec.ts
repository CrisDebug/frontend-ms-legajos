import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  /**
   * Configuración del test module
   * Solo importamos el componente standalone
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;

    // Detecta bindings iniciales
    fixture.detectChanges();
  });

  // ==========================
  // 🧪 TEST 1: creación básica
  // ==========================
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});