/**
 * Modelo Legajo (estructura base)
 * Luego se alinea 100% con backend.
 */
export interface Legajo {
  id: number;
  manualId: number;
  descripcionLegajo: string;
  casilleroId: number;

  fechaInicioLegajo?: string;
  fechaFinLegajo?: string;

  createdAt?: string;
  updatedAt?: string;
}