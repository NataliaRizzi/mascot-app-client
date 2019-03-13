import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { PetService } from '../pet.service';
import { OrgsComponent } from './orgs.component';
import { RouterLinkWithHref } from '@angular/router';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
// import {pet, user, organization} from {'../testing/mock.data'}
import { By } from '@angular/platform-browser';
import { OrgDetailComponent } from '../org-detail/org-detail.component';
import { Router } from '@angular/router';

describe('OrgsComponent', () => {
  let pet;
  let user;
  let organization;
  let router: Router;
  let component: OrgsComponent;
  let fixture: ComponentFixture<OrgsComponent>;
  let httpClient: HttpTestingController;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: `orgs/507f191e810c19729de860eb`,
            component: OrgDetailComponent
          }
        ]),
        HttpClientTestingModule
      ],
      declarations: [OrgsComponent, OrgDetailComponent],
      providers: [PetService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClient = TestBed.get(HttpTestingController);
    router = TestBed.get(Router);
    location = TestBed.get(Location);

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
    organization = {
      _id: '507f191e810c19729de860eb',
      name: 'Help WOW',
      location: 'Barcelona',
      email: 'helpwow@gmail.com',
      web: 'www.helpwow.com',
      queries: [],
      pets: [{ pet_id: '507f191e810c19729de860ea' }]
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the no organization fallback', () => {
    expect(fixture.debugElement.query(By.css('ul'))).toBeNull();
    expect(fixture.debugElement.nativeElement.innerHTML).toContain(
      'No Orgs exist at the moment'
    );
  });

  it('should render the org name', () => {
    httpClient.expectOne('http://localhost:3000/orgs').flush([organization]);
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelectorAll(
        '[data-protector-id="org-name"]'
      )[0].textContent
    ).toEqual(organization.name);
  });

  it('should navigate to the org id route', fakeAsync(() => {
    httpClient.expectOne('http://localhost:3000/orgs').flush([organization]);
    fixture.detectChanges();
    // fixture.debugElement.nativeElement.querySelectorAll('a')[0].click();
    const linkDes = fixture.debugElement.query(By.css('a'));
    linkDes.nativeElement.click();
    tick();
    expect(location.path()).toBe('/orgs/507f191e810c19729de860eb');
  }));
});
