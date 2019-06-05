import { ClubService } from './../services/club.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service';
import { CategoryService } from '../services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private clubService: ClubService,
    private userService: UserService,
    private categoryService: CategoryService
  ) {}

  clubs;
  categories;

  userForm = new FormGroup({
    category: new FormControl()
  });
  nameForm = new FormGroup({
    name: new FormControl()
  });

  get category(): any {
    return this.userForm.get('category');
  }
  get name(): any {
    return this.nameForm.get('name');
  }

  ngOnInit() {
    this.categoryService
      .getCategories()
      .subscribe(data => (this.categories = data));

    // ----------- GET CLUBS -> WORKING! -----------------------
    this.clubService.getClubs().subscribe(clubs => {
      this.clubs = clubs;
      console.log(clubs);
    });

    this.userService.getActiveUser().subscribe(user => {
      console.log(user);
    });

    // ----------- ADD SAMPLE DATA  -----------------------
    // this.addSampleData();
    // this.addSampleCategories();
  }

  onKey(event) {
    let { category } = this.userForm.getRawValue();
    if (category === null) {
      category = 'all';
    }
    console.log(category);
    console.log(event.target.value);
    this.clubService
      .searchClubs(event.target.value, category)
      .subscribe(data => {
        console.log(data);
        this.clubs = data;
      });
  }
  onChange(event) {
    let { name } = this.nameForm.getRawValue();
    if (name === null) {
      name = '';
    }

    console.log(event);

    this.clubService.searchClubs(name, event.value).subscribe(data => {
      console.log(data);
      this.clubs = data;
    });
  }

  createClub(name, brief) {
    let administrator: string = (<any>window).user._id;
    let description = 'Hunde füttern';
    let creationDate: number = Date.now();
    let time = 'Jeden Dienstag um 16 Uhr';
    let member = [administrator];

    return {
      administrator,
      name,
      description,
      brief,
      creationDate,
      time,
      member
    };
  }

  addSampleCategories() {
    this.categoryService
      .addCategory({ name: 'Laufen' })
      .subscribe(value => console.log(value));
    this.categoryService
      .addCategory({ name: 'Schach' })
      .subscribe(value => console.log(value));
    this.categoryService
      .addCategory({ name: 'Döner' })
      .subscribe(value => console.log(value));
    this.categoryService
      .addCategory({ name: 'Hundefutter' })
      .subscribe(value => console.log(value));
    this.categoryService
      .addCategory({ name: 'BiB' })
      .subscribe(value => console.log(value));
    this.categoryService
      .addCategory({ name: 'Yoga' })
      .subscribe(value => console.log(value));
  }

  addSampleData() {
    this.clubService
      .addClubs(this.createClub('Laufgruppe', 'Lass laufen.'))
      .subscribe(data => console.log(data));
    this.clubService
      .addClubs(this.createClub('Hundefutter Gruppe', 'Hunde füttern.'))
      .subscribe(data => console.log(data));
    this.clubService
      .addClubs(this.createClub('Schach', 'und matt.'))
      .subscribe(data => console.log(data));
    this.clubService
      .addClubs(this.createClub('Kletteräffchen', 'Ran an die Wand.'))
      .subscribe(data => console.log(data));
    this.clubService
      .addClubs(
        this.createClub('Pokerrunde', 'Wir ziehen dir das Geld aus der Tasche.')
      )
      .subscribe(data => console.log(data));
  }
}
