import { Component, OnInit } from '@angular/core';

import { PetService } from '../pet.service';
import { Pet } from '../models/pet.model';
import { User } from '../models/user.model';
import { stringify } from '@angular/core/src/render3/util';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  pets: Pet[];
  user: User;
  dismissible = true;

  markAsRead(dismissedAlert: any, user: any): void {
    this.user.messages = this.user.messages.filter(alert => alert !== dismissedAlert);
    this.petService
      .markAsRead(dismissedAlert._id, user._id)
      .subscribe(data => console.log('data', data), error => console.log('error', error));
  }

  constructor(private petService: PetService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.getPets();
    this.getUser();
  }

  getPets(): void {
    this.petService.getPets().subscribe(pets => {
      this.pets = pets.filter(i => i.available !== false);
      console.log(this.pets, 'pets')

    });

  }

  getUser(): User {
    const id = this.route.snapshot.paramMap.get('_id');
    this.petService.getUser(id).subscribe(user => (this.user = user));
    return this.user;
  }

  read(): void {
    console.log(this.user);
  }
}
