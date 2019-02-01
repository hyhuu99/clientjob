import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@app/auth/service/authentication.service';
import { AccountService } from '@app/auth/service/account.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FindValueSubscriber } from 'rxjs/operators/find';
import { ErrorAccountCode, EAccountType } from '@app/shared/constants/sys-enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() login: boolean;
  loginForm: FormGroup;
  singupForm: FormGroup;
  isSubmitSingup = false;
  isSubmitLogin = false;
  error = false;
  singupError = false;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private accountService: AccountService) {
  }

  ngOnInit() {
    this.login = true;
    this.isSubmitSingup = false;
    this.createForm();
    this.createSingupForm();
  }
  get f() {
    return this.singupForm.controls;
  }
  get g() {
    return this.loginForm.controls;
  }
  public switch(event) {
    this.error = false;
    this.singupError = false;
    if (this.login !== event) {
      this.login = event;
    }
  }
  singupFunction() {
    this.accountService.singup(this.singupForm.value)
    .subscribe((data: any) => {
      this.loginForm.value.username = this.singupForm.value.email;
      this.loginForm.value.password = this.singupForm.value.password;
      this.loginForm.value.remember = true;
      this.loginfunction();
    }, (err) => {
      this.singupError = true;
      if (err.error.errorCode === ErrorAccountCode.DuplicateEmail) {
        this.errorMessage = 'Tài khoản đã tồn tại';
      } else {
        this.errorMessage = 'Tạo tài khoản không thành công';
      }
    });
  }
  singupButton() {
    this.isSubmitSingup = true;
  }
  loginButton() {
    this.isSubmitLogin = true;
  }
  public async loginfunction() {
    this.accountService.getRoleUser(this.loginForm.value.username).subscribe(g => {
      if (g !== null) {
        this.authenticationService.userRole = g.data;
        this.authenticationService.setLoginData(this.loginForm.value);
        this.authenticationService.loginData = this.authenticationService.requestLogin(g.data, this.authenticationService.loginData);
        this.authenticationService.login(this.loginForm.value)
        .subscribe((data: any) => {
         if (data != null) { 
                 if (data.error != null) {
                   this.error = true;
                 } else if (this.authenticationService.userRole === 'Candidate') {
                  const dataStorage = {
                    username: this.loginForm.value.username,
                    access_token: data.access_token,
                    expires_in : data.expires_in,
                    isHr: false
                };
                   this.authenticationService.setCredentials(dataStorage, this.loginForm.value.remember);
                   this.router.navigate(['']);
                 } else if (this.authenticationService.userRole === 'Hr') {
                  const dataStorage = {
                    username: this.loginForm.value.username,
                    access_token: data.access_token,
                    expires_in : data.expires_in,
                    isHr: true
                };
                   this.authenticationService.setCredentials(dataStorage, this.loginForm.value.remember);
                   this.router.navigate(['/congty']);
                 }
          }
        }, (err) => {
           this.error = true;
        });
      }
   });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: true
    });
  }

  private createSingupForm() {
    this.singupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isHr: false
    });
  }

}
