import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertModule } from 'ngx-bootstrap/alert';
import { UserComponent } from './user.component';
import { PetListComponent } from '../pet-list/pet-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PetService } from '../pet.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { PetComponent } from '../pet/pet.component';
import { MatCardModule,MatSnackBar } from '@angular/material';
import { By } from '@angular/platform-browser';
import { ActivatedRouteStub } from '../testing/activated-route-stub';
import { ActivatedRoute } from '@angular/router';

describe('UserComponent', () => {
  let component: UserComponent;
  let petComponent : PetComponent
  let fixture: ComponentFixture<UserComponent>;
  let fixturePet: ComponentFixture<PetComponent>;
  let httpClient: HttpTestingController;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(() => {
    // create a new istance of the active route
    activatedRoute = new ActivatedRouteStub();
  });

  let pet;
  let user;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent, PetListComponent, PetComponent],
      imports: [
        RouterTestingModule,
        BsDropdownModule,
        AlertModule,
        CollapseModule,
        HttpClientTestingModule,
        MatCardModule
      ],

      providers: [
        PetService,
        {
          provide: ActivatedRoute,
          useValue: activatedRoute
        },
        MatSnackBar,{provide: MatSnackBar, useValue:{}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixturePet = TestBed.createComponent(PetComponent);
    petComponent = fixturePet.componentInstance;
    activatedRoute.setParamMap({ _id: '507f191e810c19729de860ef' });
    fixture.detectChanges();
    httpClient = TestBed.get(HttpTestingController);

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

  it('should contain the no user fallback', () => {
    expect(fixture.debugElement.query(By.css('app-pet-list'))).toBeNull();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain('No User');
  });

  it('should render a pet list', () => {
    httpClient.expectOne('http://localhost:3000/pets').flush([pet]);
    httpClient
      .expectOne('http://localhost:3000/users/507f191e810c19729de860ef')
      .flush(user);
    fixture.detectChanges();
    // expect(fixture.debugElement.query(By.css('app-pet-list'))).toBeNull();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll(
        '[data-protector-id="pet-breed"]'
      )[0].textContent
    ).toEqual(` ${pet.species} `);
    expect(
      fixture.debugElement.nativeElement.querySelectorAll(
        '[data-protector-id="pet-age"]'
      )[0].textContent
    ).toEqual(`${pet.age} años`);
    expect(
      fixture.debugElement.nativeElement.querySelectorAll(
        '[data-protector-id="pet-weight"]'
      )[0].textContent
    ).toEqual(`${pet.weight} Kg`);
    expect(
      fixture.debugElement.nativeElement.querySelectorAll(
        '[data-protector-id="pet-size"]'
      )[0].textContent
    ).toEqual(pet.size);
    expect(
      fixture.debugElement.nativeElement.querySelectorAll(
        '[data-protector-id="pet-location"]'
      )[0].textContent
    ).toEqual(`${pet.location}`);
    expect(
      fixture.debugElement.nativeElement
        .querySelectorAll('img')[0]
        .getAttribute('src')
    ).toEqual(pet.image);

    httpClient.verify();
  });


  test('it should send an adoption request', ()=>{
      httpClient.expectOne('http://localhost:3000/pets').flush([pet]);
      httpClient
        .expectOne('http://localhost:3000/users/507f191e810c19729de860ef')
        .flush(user);
      fixture.detectChanges();
      const  adoptionButton = fixture.debugElement.query(By.css('[data-protector-id="pet-adoption"]'))
    adoptionButton.nativeElement.click();
    fixturePet.detectChanges();
// expect(petComponent.adoptionRequest.emit).toHaveBeenCalled();
    })

});
