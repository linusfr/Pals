// -----------------------------------------------------------------------------
//Diese Komponente dient der Erstellung von Clubs.
//Es werden die vom User eingegebenen Parameter überprüft
//und validiert und anschließend an den Service weitergeleitet.
//------------------------------------------------------------------------------

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

  //userForm ist für die Verarbeitung der User-Eingaben zuständig.
  //Die FormGroup übernimmt den Zustand und die Validierung der im
  //HTML vorhandenen FormControl-Instanzen. Validators.required überprüft,
  //ob der eingebene Name schon verwendet wird.
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    brief: new FormControl(),
    description: new FormControl(),
    category: new FormControl()
  });

  //Hier werden die einzelnen Werte der FormGroup ausgelesen.
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

  //addCategory dient dazu, dem User die Möglichkeit geben, Kategorien hinzuzufügen.
  addCategory = category => {
    this.show = false;
    this.categoryService
      .addCategory({ name: category })
      .subscribe(value => this.categories.push(value));
  };

  async createClub() {
    //Hier wird der Validator aus der FormGroup abgefragt
    if (!this.userForm.valid) {
      return;
    }

    let { name, brief, description, category } = this.userForm.getRawValue();
    let administrator = localStorage.activeUser;
    let creationDate = await new Date().toISOString();
    let member = [administrator];

    let club;

    //Dem ClubService werden die Werte des Clubs übergeben, der erstellt werden soll.
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
        data.subscribe(async value => {
          club = value;
          console.log(value);
          //Der alert wird geworfen, wenn der Name bereits vergeben wurde
          if (value === 'error') {
            alert('Clubname schon in Benutzung!');
          } else {
            //Es wird eine Gruppe in der Chat-Api erstellt, die dem erstellten Clb zugeordnet wird
            await this.chatAuth.createGroup(club._id, name);
            //Für den erstellten Club wird der Administrator des Clubs der Chatgruppe hinzugefügt
            this.chatAuth.addGroupMember(club._id, localStorage.activeUser);
            this.router.navigate(['detailedClub', club._id]);
          }
        });
      });
  }
}
