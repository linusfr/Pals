import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-profile-page',
  templateUrl: './change-profile-page.component.html',
  styleUrls: ['./change-profile-page.component.scss']
})
export class ChangeProfilePageComponent implements OnInit {
  user;
  email;
  fullname;

  constructor(private userService: UserService, private router: Router) {}
  userSplit = [];

  userForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    userEmail: new FormControl()
  });

  get firstName(): any {
    return this.userForm.get('firstName');
  }
  get lastName(): any {
    return this.userForm.get('lastName');
  }
  get userEmail(): any {
    return this.userForm.get('userEmail');
  }

  editUser() {
    this.userService.getActiveUser().subscribe(user => {
      console.log(user);
      this.user = user;
      this.email = this.user.email;
      this.fullname = this.user.fullname;
      this.userSplit = this.fullname.split(' ');
      this.userSplit.forEach(value => console.log(value));

      let { firstName, lastName, userEmail } = this.userForm.getRawValue();
      console.log(firstName, lastName, userEmail);

      if (firstName === null) {
        firstName = this.userSplit[0];
      }
      if (lastName === null) {
        lastName = this.userSplit[1];
      }
      if (userEmail === null) {
        userEmail = this.email;
      }

      let id = localStorage.activeUser;
      let fullName;

      if (lastName === null && this.userSplit[1] === undefined) {
        fullName = firstName;
      } else {
        fullName = firstName + ' ' + lastName;
      }
      let email = this.email;

      console.log('data', id, fullName, userEmail);

      this.userService.editUser({ id, fullName, userEmail }).subscribe(data => {
        console.log(data);
        data = '' + data;
        if (data === 'emailExists') {
          alert('Emailadresse bereits in Verwendung.');
        } else {
          this.router.navigate(['/profile']);
        }
      });
    });
  }

  ngOnInit() {
    this.userService.getActiveUser().subscribe(user => {
      console.log(user);
      this.user = user;
      this.email = this.user.email;
      this.fullname = this.user.fullname;
      this.userSplit = this.fullname.split(' ');
      this.userSplit.forEach(value => console.log(value));
    });
  }
}
