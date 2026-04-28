import { TestBed } from '@angular/core/testing';
import { LegajosService } from './legajos.service';

describe('LegajosService', () => {

  let service: LegajosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegajosService);
  });

  it('should find legajo by manualId and casilleroId', (done) => {
    service.searchByManualId(1, 1001).subscribe(res => {

      expect(res).not.toBeNull();

      if (res) {
        expect(res.manualId).toBe(1001);
        expect(res.casilleroId).toBe(1);
      }

      done();
    });
  });

  it('should return null when legajo does not exist', (done) => {
    service.searchByManualId(9999, 9999).subscribe(res => {
      expect(res).toBeNull();
      done();
    });
  });

  it('should create a new legajo', (done) => {

    const nuevo = {
      manualId: 9999,
      descripcionLegajo: 'test legajo',
      casilleroId: 1,
      fechaInicioLegajo: '2026-01-01'
    };

    service.createLegajo(nuevo).subscribe(res => {

      expect(res.id).toBeDefined();
      expect(res.manualId).toBe(9999);
      expect(res.casilleroId).toBe(1);

      done();
    });
  });
  it('should cover null branch in searchByManualId', (done) => {

  service.searchByManualId(9999, 9999).subscribe(res => {

    expect(res).toBeNull(); // 👈 cubre branch "false"

    done();
  });

  });

  it('should cover found branch in searchByManualId', (done) => {

  service.searchByManualId(1, 1001).subscribe(res => {

    if (res) {
      expect(res.manualId).toBe(1001); // 👈 cubre branch "true"
    } else {
      fail('should not be null');
    }

    done();
  });

});
it('should execute createLegajo branch and mutate array', (done) => {

  const before = (service as any).legajos.length;

  service.createLegajo({
    manualId: 8888,
    descripcionLegajo: 'sonar test',
    casilleroId: 1,
    fechaInicioLegajo: '2026-01-01'
  }).subscribe(() => {

    const after = (service as any).legajos.length;

    expect(after).toBeGreaterThan(before);

    done();
  });

});
});