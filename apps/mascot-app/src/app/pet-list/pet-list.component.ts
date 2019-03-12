import { Component, OnInit, Input } from '@angular/core';
import { Pet } from '../models/pet.model';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss']
})
export class PetListComponent implements OnInit {
  @Input() petsList: Pet[];
  constructor(private petService: PetService) {}
  ngOnInit() {}
}
