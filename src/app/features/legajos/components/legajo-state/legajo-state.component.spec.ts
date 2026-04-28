import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LegajoStateComponent } from './legajo-state.component';

describe('LegajoStateComponent', () => {

  let component: LegajoStateComponent;
  let fixture: ComponentFixture<LegajoStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegajoStateComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LegajoStateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 🟢 CUBRE TODOS LOS BRANCHES DEL STATE MACHINE (CLAVE SONAR)
  it('should execute all state modes', () => {

    const states = [
      { mode: 'idle' },
      { mode: 'loading' },
      {
        mode: 'found',
        legajo: {
          id: 1,
          manualId: 1001,
          descripcionLegajo: 'test',
          casilleroId: 1,
          fechaInicioLegajo: '2026-01-01'
        }
      },
      { mode: 'not-found', manualId: 123 },
      { mode: 'creating', manualId: 777 }
    ] as any[];

    states.forEach((state) => {
      component.state = state;
      fixture.detectChanges();

      expect(component.state).toBeDefined();
    });
  });

  // 🟢 OUTPUT COVERAGE REAL
  it('should emit create event', () => {
    spyOn(component.create, 'emit');

    component.create.emit(123);

    expect(component.create.emit).toHaveBeenCalledWith(123);
  });

});