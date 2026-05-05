import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:8084/api/auth';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  // =========================
  // LOGIN
  // =========================
  it('should login and store session', () => {
    const mockResponse: any = {
      token: 'fake-token',
      email: 'test@test.com',
      rol: 'ADMIN'
    };

    service.login('test@test.com', '1234').subscribe(res => {
      expect(res.token).toBe('fake-token');
      expect(localStorage.getItem('token')).toBe('fake-token');
      expect(localStorage.getItem('auth_user')).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toBe('POST');

    req.flush(mockResponse);
  });

  // =========================
  // TOKEN
  // =========================
  it('should return token if exists', () => {
    localStorage.setItem('token', 'abc123');
    expect(service.getToken()).toBe('abc123');
  });

  it('should return null if no token', () => {
    localStorage.removeItem('token');
    expect(service.getToken()).toBeNull();
  });

  // =========================
  // AUTH STATE
  // =========================
  it('should detect logged in true', () => {
    localStorage.setItem('token', 'abc123');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should detect logged in false', () => {
    localStorage.removeItem('token');
    expect(service.isLoggedIn()).toBeFalse();
  });

  // =========================
  // LOGOUT
  // =========================
  it('should logout clear session', () => {
    localStorage.setItem('token', 'abc123');
    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
  });

  // =========================
  // TOKEN DECODE (BRANCHES CLAVE)
  // =========================
  it('should return null if token missing', () => {
    localStorage.removeItem('token');
    expect(service.getUserFromToken()).toBeNull();
  });

  it('should decode token correctly', () => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwic3ViIjoidGVzdEB0ZXN0LmNvbSIsInJvbGUiOiJBRE1JTiJ9.signature'
    );

    const user = service.getUserFromToken();

    expect(user.id).toBe(1);
    expect(user.email).toBe('test@test.com');
    expect(user.role).toBe('ADMIN');
  });
});