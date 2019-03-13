import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PetService } from '../pet.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PetComponent } from './pet.component';
import { By } from '@angular/platform-browser';
import { ActivatedRouteStub } from '../testing/activated-route-stub';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBarModule,MAT_SNACK_BAR_DEFAULT_OPTIONS ,MatSnackBar} from "@angular/material";
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PetComponent', () => {
  let component: PetComponent;
  let fixture: ComponentFixture<PetComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(() => {
    activatedRoute = new ActivatedRouteStub();
  });

  let pet;
  let user;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PetComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [PetService, MatSnackBar,{provide: MatSnackBar, useValue:{}}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    activatedRoute.setParamMap({ _id: '507f191e810c19729de860ef' });

    pet = {
      _id: '507f191e810c19729de860ea',
      adopted: false,
      available: true,
      species: 'Kitzi',
      breed: 'Thai',
      name: 'Expresso',
      age: 1,
      weight: 3.4,
      size: 'Small',
      location: 'Stuttgart',
      owner: null,
      image: 'https://images.dog.ceo/breeds/borzoi/n02090622_6131.jpg',
      organization: '509f191e810c19729de860eb'
    };
    user = {
      _id: '507f191e810c19729de860ef',
      name: 'Pitbull',
      email: 'pitbull@gmail.com',
      location: 'Barcelona',
      pets: [],
      messages: []
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xtest('should sent a confirmation modal when an adoption request is sent', () => {
    component.petDetail = pet;
    fixture.detectChanges();

    // component.smth = {pet}
    const adoptionButton = fixture.debugElement.query(
      By.css('[data-protector-id="pet-adoption"]')
    );
    adoptionButton.nativeElement.click();
    fixture.detectChanges();
    console.log(fixture.debugElement.nativeElement.querySelectorAll('snack-bar-container'), "snkac confirm")
   expect(fixture.debugElement.nativeElement.querySelectorAll('snack-bar-container')).toBeTruthy()
    // expect(component.sendAdoption).toEqual({org: "5c7ffa02828f0f89ba7f366b", pet: "5c84e3f612a38a717b3265bc", user: "5c7ffbc2828f0f89ba7f366c"});
  });
});
