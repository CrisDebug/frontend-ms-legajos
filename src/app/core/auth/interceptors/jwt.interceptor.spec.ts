import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { authInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let authServiceMock: any;

  beforeEach(() => {
    authServiceMock = {
      getToken: jasmine.createSpy('getToken').and.returnValue('fake-token')
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    });
  });

  it('should add Authorization header if token exists', (done) => {
    const req = new HttpRequest('GET', '/test');

    const next: HttpHandler = {
      handle: (request: any) => {
        expect(request.headers.get('Authorization')).toBe('Bearer fake-token');
        return of({});
      }
    };

    authInterceptor(req, next).subscribe(() => done());
  });

  it('should NOT add header if no token', (done) => {
    authServiceMock.getToken.and.returnValue(null);

    const req = new HttpRequest('GET', '/test');

    const next: HttpHandler = {
      handle: (request: any) => {
        expect(request.headers.has('Authorization')).toBeFalse();
        return of({});
      }
    };

    authInterceptor(req, next).subscribe(() => done());
  });
});