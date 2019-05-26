import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.scss']
})
export class CreateClubComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {}

  // // Form Group
  // userForm = new FormGroup({
  //   fullname: new FormControl('', [Validators.required]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required]),
  //   repeatPassword: new FormControl('', [
  //     Validators.required,
  //     this.passwordsMatchValidator
  //   ])
  // });

  // get fullname(): any {
  //   return this.userForm.get('fullname');
  // }
  // get email(): any {
  //   return this.userForm.get('email');
  // }
  // get password(): any {
  //   return this.userForm.get('password');
  // }
  // get repeatPassword(): any {
  //   return this.userForm.get('repeatPassword');
  // }

  // register() {
  //   if (!this.userForm.valid) {
  //     return;
  //   }

  //   let {
  //     fullname,
  //     email,
  //     password,
  //     repeatPassword
  //   } = this.userForm.getRawValue();
}
