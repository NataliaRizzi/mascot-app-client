import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

import { PetService } from '../pet.service';
import { Pet } from '../models/pet.model';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {
  // check the best option
  @Input() petDetail: Pet;
  private sendAdoption: {};

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private location: Location,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  adoptionRequest(): void {
    const petId = this.petDetail._id;
    const userId = this.route.snapshot.paramMap.get('_id');
    this.petService
      .adoptionRequest(this.petDetail.organization, petId, userId)
      .subscribe(
        data => {
          this.sendAdoption = data;
        },
        error => console.log('error', error),
        ()=>{          this.openSnackBar();
        }
      );
  }

  openSnackBar() {
    this.snackBar.open('your place was added succesfull', 'close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: 'snack-confirm'
    });
  }

  goBack(): void {
    this.location.back();
  }
}
