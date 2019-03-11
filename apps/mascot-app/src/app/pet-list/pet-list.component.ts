import { Component, OnInit } from '@angular/core';
import { Pet } from '../models/pet.model';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {
pets: Pet[]
  constructor(private petService: PetService) { }

  ngOnInit() {
    this.petService.getPets().subscribe(pets =>this.pets = pets )
  }

}
