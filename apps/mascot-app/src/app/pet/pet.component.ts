import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { PetService } from '../pet.service';
import { Pet } from '../models/pet.model';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})

export class PetComponent implements OnInit {
// check the best option
  @Input() pet: Pet;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getPet();
  }

  getPet(): void {
    const id = this.route.snapshot.paramMap.get('_petId');
    this.petService.getPet(id)
      .subscribe(pet => this.pet = pet);
  }

  adoptionRequest(orgId): void {
    const petId = this.route.snapshot.paramMap.get('_petId');
    const userId = this.route.snapshot.paramMap.get('_userId');
    this.petService.adoptionRequest(orgId, petId, userId)
      .subscribe(
        data => console.log('data', data),
        error => console.log('error', error)
      );
    this.goBack();

    // const id = this.route.snapshot.paramMap.get('_id');
    // this.petService.getPet(id)
    //   .subscribe(pet => this.pet = pet);
  }
  // adoptionRequest(org: {}, pet: String, user: String): Observable<Org> {
  //   console.log('345', org, user, pet);

  //   const url = `${this.petUrl}/orgs/${org._id}`
  //   org.queries.push({user, pet})
  //   console.log('url', url);
  //   console.log('org', org);
  //   console.log('<Org>', <Org>);
  //   return this.http.put<Org>(url, org)
  //     .pipe(
  //       catchError(this.handleError('a', org))
  //     )
  // }

  goBack(): void {
    this.location.back();
  }

}
