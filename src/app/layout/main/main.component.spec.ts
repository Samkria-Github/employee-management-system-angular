import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { DestroyRef } from '@angular/core';
import { MainComponent } from './main.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { SpinnerService } from '../../service/spinner.service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainComponent,
        CommonModule,
        NoopAnimationsModule,
        HeaderComponent,
        RouterOutlet
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: {}, snapshot: { params: {} } } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: AuthService, useValue: { isAuthenticated: () => true } },
        { provide: DestroyRef, useValue: { onDestroy: jasmine.createSpy('onDestroy') } },
        { provide: FormBuilder, useValue: { 
          group: jasmine.createSpy('group').and.returnValue({ valid: true }) 
        } },
        { provide: SpinnerService, useValue: { 
          addToLoader: jasmine.createSpy('addToLoader'),
          removeFromLoader: jasmine.createSpy('removeFromLoader')
        } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render header component', () => {
    const header = fixture.debugElement.query(By.css('employee-management-header'));
    expect(header).toBeTruthy();
  });

  it('should render router outlet', () => {
    const outlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(outlet).toBeTruthy();
  });

  it('should render main content area', () => {
    const main = fixture.debugElement.query(By.css('main.content'));
    expect(main).toBeTruthy();
  });
});
