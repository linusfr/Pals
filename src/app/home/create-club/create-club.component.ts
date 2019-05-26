import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors
} from '@angular/forms';

@Component({
  selector: '[app-create-club], [ng-if-simple]',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.scss'],
})
  
  export class CreateClubComponent implements OnInit {
    constructor(private userService: UserService) {}
    
    show : boolean =  false;
  ngOnInit() {}

  // Form Group
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    theme: new FormControl(),
    description: new FormControl()
  });

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
