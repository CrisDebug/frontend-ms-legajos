import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  beforeEach(async () => {
    // 🧠 Configuración del TestBed para componente standalone
    await TestBed.configureTestingModule({
      imports: [AppComponent]
    }).compileComponents();
  });

  /**
   * 🟢 TEST 1: Verifica que el componente se crea correctamente
   */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  /**
   * 🟢 TEST 2: Verifica el valor del título (lógica interna)
   */
  it('should have correct title value', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.title).toBe('frontend-ms-legajos');
  });

});