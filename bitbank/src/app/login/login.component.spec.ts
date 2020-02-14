import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { blankUser, validUser } from 'src/mocks';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';


const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const loginServiceSpy = jasmine.createSpyObj('LoginService', ['login']);

const testUserData = { name: 'Alan Silva Brasilino', cpf: '394.019.518-96', token: 'xxxxxxxxxxxx'};
describe('Login Component Isolated Test', () => {
  let component: LoginComponent;

  beforeEach(async(() => {
    component = new LoginComponent(routerSpy, new FormBuilder(), loginServiceSpy);
  }));

  function updateForm(userCpf, userPassword) {
    component.form.controls.cpf.setValue(userCpf);
    component.form.controls.password.setValue(userPassword);
  }

  it('Component successfully created', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.loginSubmitted).toBeFalsy();
    expect(component.form).toBeDefined();
    expect(component.form.invalid).toBeTruthy();
    expect(component.error).toBeFalsy();
    expect(component.error).toBeUndefined();
  });

  it('submitted should be true when onSubmit()', () => {
    component.login(blankUser);
    expect(component.loginSubmitted).toBeTruthy();
    expect(component.error).toBeFalsy();
  });

  it('form value should update from when u change the input', (() => {
    updateForm(validUser.cpf, validUser.password);
    expect(component.form.value).toEqual(validUser);
  }));

  it('Form invalid should be true when form is invalid', (() => {
    updateForm(blankUser.cpf, blankUser.password);
    expect(component.form.invalid).toBeTruthy();
  }));
});

describe('Login Component Shallow Test', () => {

  let fixture: ComponentFixture<LoginComponent>;

  function updateForm(userCpf, userPassword) {
    fixture.componentInstance.form.controls.cpf.setValue(userCpf);
    fixture.componentInstance.form.controls.password.setValue(userPassword);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatIconModule,
        MatInputModule],
      providers: [
        {provide: LoginService, useValue: loginServiceSpy},
        FormBuilder,
        { provide: Router, useValue: routerSpy }
      ],
      declarations: [
        LoginComponent,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
  }));

  it('created a form with username and password input and login button', () => {
    // const fixture = TestBed.createComponent(LoginComponent);
    const cpfContainer = fixture.debugElement.nativeElement.querySelector('#cpf-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    expect(cpfContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
  });

  it('Display Username Error Msg when Username is blank', () => {
    updateForm(blankUser.cpf, validUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#cpf-error-msg');
    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Campo Obrigatório');
  });

  it('Display Password Error Msg when Username is blank', () => {
    updateForm(validUser.cpf, blankUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');
    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Campo Obrigatório');
  });

  it('Display Both Username & Password Error Msg when both field is blank', () => {
    updateForm(blankUser.cpf, blankUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#cpf-error-msg');
    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');

    expect(usernameErrorMsg).toBeDefined();
    expect(usernameErrorMsg.innerHTML).toContain('Campo Obrigatório');

    expect(passwordErrorMsg).toBeDefined();
    expect(passwordErrorMsg.innerHTML).toContain('Campo Obrigatório');
  });

  it('When username is blank, username field should display red outline ', () => {
    updateForm(blankUser.cpf, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const usernameInput = inputs[0];

    expect(usernameInput.classList).toContain('ng-invalid');
  });

  it('When password is blank, password field should display red outline ', () => {
    updateForm(validUser.cpf, blankUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const passwordInput = inputs[1];

    expect(passwordInput.classList).toContain('ng-invalid');
  });
});

describe('Login Component Integrated Test', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let loginSpy;
  function updateForm(userCpf, userPassword) {
    fixture.componentInstance.form.controls.cpf.setValue(userCpf);
    fixture.componentInstance.form.controls.password.setValue(userPassword);
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [
        {provide: LoginService, useValue: loginServiceSpy},
        FormBuilder,
        { provide: Router, useValue: routerSpy }
      ],
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);

    // router = TestBed.get(Router);

    loginSpy = loginServiceSpy.login.and.returnValue(Promise.resolve(testUserData));

  }));

  xit('loginService login() should called ', fakeAsync(() => {
    updateForm(validUser.cpf, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    
    expect(loginServiceSpy.login).toHaveBeenCalled();
  }));

  xit('should route to home if login successfully', fakeAsync(() => {
    updateForm(validUser.cpf, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    advance(fixture);

    loginSpy = loginServiceSpy.login.and.returnValue(Promise.resolve(testUserData));
    advance(fixture);

    // expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    const navArgs = {navigate: jasmine.createSpy('navigate')}
    // expecting to navigate to id of the component's first hero
    expect(navArgs.navigate).toHaveBeenCalledWith('/extrato');
  }));
  function advance(f: ComponentFixture<any>) {
    tick();
    f.detectChanges();
  }
});