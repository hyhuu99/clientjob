import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Input() 
  changPhoneNumberForm: FormGroup;
  changeEmailForm: FormGroup;
  error = false;
  isSubmit = false;
  isChangeEmailSubmit = false;
  constructor(private formBuilder: FormBuilder,) {
    this.createChangePhoneNumberForm();
    this.createChangeEmailForm();

   }

  ngOnInit() {
  }
  public changeInfo(){
    this.isSubmit = true;
  }

  public changeEmail(){

    this.isChangeEmailSubmit = true;
  }
  get f(){
    return this.changPhoneNumberForm.controls;
  }

  get e(){
    return this.changeEmailForm.controls;
  }
  
  private createChangePhoneNumberForm() {
    this.changPhoneNumberForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword :['',[Validators.required, Validators.minLength(6)]]
    }, {validator: this.matchingPasswords('newPassword', 'confirmPassword')} );
  }

  private createChangeEmailForm() {
    this.changeEmailForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      email: ['', [Validators.required]],
      confirmEmail :['',[Validators.required]]
    }, {validator: this.matchingEmails('email', 'confirmEmail')});
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  matchingEmails(emailKey: string, confirmEmailKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let email = group.controls[emailKey];
      let confirmEmail = group.controls[confirmEmailKey];
      
      if (email.value !== confirmEmail.value) {
        return {
          mismatchedEmails: true
        };
      }
    }
  }

}
