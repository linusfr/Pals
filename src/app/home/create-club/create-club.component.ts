import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors
} from '@angular/forms';
import { ClubService } from '../../services/club.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.scss']
})
export class CreateClubComponent implements OnInit {
  constructor(
    private clubService: ClubService,
    private userService: UserService,
    private router: Router
  ) {}

  show = false;
  ngOnInit() {}

  // Form Group
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    brief: new FormControl(),
    description: new FormControl()
  });

  get name(): any {
    return this.userForm.get('name');
  }
  get brief(): any {
    return this.userForm.get('brief');
  }
  get description(): any {
    return this.userForm.get('description');
  }

  // --> CATEGORY
  // get cate(): any {
  // return this.userForm.get('repeatPassword');
  // }

  createClub() {
    if (!this.userForm.valid) {
      return;
    }

    let {
      name,
      brief,
      description
      // category
    } = this.userForm.getRawValue();

    let administrator = localStorage.activeUser;
    let creationDate = new Date().toISOString;
    let time = 'test';
    let member = [administrator];

    let club;

    this.clubService
      .addClubs({
        administrator,
        name,
        description,
        brief,
        creationDate,
        time,
        member
      })
      .subscribe(data => {
        club = data;
        this.router.navigate(['detailedClub', club._id]);
      });
  }
}
