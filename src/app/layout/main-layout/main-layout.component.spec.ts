import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    localStorage.setItem(
      'token',
      'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwic3ViIjoidGVzdEB0ZXN0LmNvbSIsInJvbGUiOiJBRE1JTiJ9.signature'
    );

    await TestBed.configureTestingModule({
      imports: [MainLayoutComponent, HttpClientTestingModule],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create layout', () => {
  expect(component).toBeTruthy();
});
});