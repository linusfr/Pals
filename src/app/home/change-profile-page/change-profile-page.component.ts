//-----------------------------------------------------------------------------
// Mit dieser Komponente können die Profile von Nutzern geändert werden.
// Es werden die User-Informationen geholt und 
//
//-----------------------------------------------------------------------------

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

  // Mit userForm verarbeitet man die User-Eingaben.
  // Die FormGroup übernimmt den Zustand der im HTML
  // vorhandenen FormControl-Instanzen.
  userForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    userEmail: new FormControl()
  });

  //Hier werden die einzelnen Werte der userForm ausgelesen.
  get firstName(): any {
    return this.userForm.get('firstName');
  }
  get lastName(): any {
    return this.userForm.get('lastName');
  }
  get userEmail(): any {
    return this.userForm.get('userEmail');
  }

  //Die Bearbeitung findet hier statt.
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

      //Werden bestimmte Werte nicht verändert, werden die alten Werte beibehalten.
      if (firstName === null) {
        firstName = this.userSplit[0];
      }
      if (lastName === null) {
        lastName = this.userSplit[1];
      }
      if (userEmail === null) {
        userEmail = this.email;
      }

      //Die ID wird aus dem LocalStorage geholt.
      let id = localStorage.activeUser;
      let fullName;

      //Wenn kein Nachname vorhanden ist, wird nur der Vorname eingesetzt.
      if (lastName === null && this.userSplit[1] === undefined) {
        fullName = firstName;
      } else {
        fullName = firstName + ' ' + lastName;
      }
      let email = this.email;

      //Die Daten werden dem Service übergeben
      this.userService.editUser({ id, fullName, userEmail }).subscribe(data => {
        data = '' + data;
        if (data === 'emailExists') {
          alert('Emailadresse bereits in Verwendung.');
        } else {
          this.router.navigate(['/profile']);
        }
      });
    });
  }

  //Hier werden die alten Daten des Users ausgelesen
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
