import { Component, OnInit } from '@angular/core';
import { PetService } from '../pet.service';
import { Org } from '../models/org.model';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
// import {pet, user, organization} from {'../testing/mock.data'}

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html',
  styleUrls: ['./orgs.component.scss']
})
export class OrgsComponent implements OnInit {
  orgs: Org[];

  constructor(private petService: PetService) { }

  ngOnInit() {
    this.getOrgs();
  }

  getOrgs(): void {
    this.petService.getOrgs()
      .subscribe(orgs => this.orgs = orgs);
  }
}
