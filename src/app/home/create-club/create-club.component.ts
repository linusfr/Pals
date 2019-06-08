import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClubService } from '../../services/club.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CometChatApiService } from '../../chat/CometChatService/comet-chat-api.service';

@Component({
  selector: 'app-create-club',
  templateUrl: './create-club.component.html',
  styleUrls: ['./create-club.component.scss']
})
export class CreateClubComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private clubService: ClubService,
    private router: Router,
    private chatAuth: CometChatApiService
  ) {}

  show = false;
  selectedValue = 'Kategorie';
  ngOnInit() {
    this.categoryService
      .getCategories()
      .subscribe(data => (this.categories = data));
  }

  // Form Group
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    brief: new FormControl(),
    description: new FormControl(),
    category: new FormControl()
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
  get category(): any {
    return this.userForm.get('category');
  }

  categories;

  addCategory = category => {
    this.show = false;
    this.categoryService
      .addCategory({ name: category })
      .subscribe(value => this.categories.push(value));
    // tslint:disable-next-line:semicolon
  };

  async createClub() {
    if (!this.userForm.valid) {
      return;
    }

    let { name, brief, description, category } = this.userForm.getRawValue();

    let administrator = localStorage.activeUser;
    let creationDate = await new Date().toISOString();
    let member = [administrator];

    let club;

    this.clubService
      .addClubs({
        administrator,
        category,
        name,
        description,
        brief,
        creationDate,
        member
      })
      .then(data => {
        data.subscribe(value => {
          club = value;

          this.chatAuth.createGroup(club._id, name); // create new group in chat db
          this.chatAuth.addGroupMember(club._id, localStorage.activeUser);
          this.router.navigate(['detailedClub', club._id]);
        });
      });
  }
}
