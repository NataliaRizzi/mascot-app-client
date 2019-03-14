import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { PetService } from './pet.service';
import { pet, organization, user } from './testing/mock.data';

describe('PetService', () => {
  let httpTestingController: HttpTestingController;
  const pets = [
    pet,
    {
      _id: '507f191e810c19729de860dsa',
      adopted: false,
      available: true,
      species: 'Kitzi',
      breed: 'European',
      name: 'Pitbull',
      age: 1,
      weight: 3.4,
      size: 'Small',
      location: 'Stuttgart',
      owner: null,
      image: 'https://images.dog.ceo/breeds/borzoi/n02090622_6131.jpg',
      organization: '507f191e810c19729de860eb'
    }
  ];

  let service: PetService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PetService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(PetService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('should add a pet', done => {
    service.addPet(pet).subscribe(newPet => {
      expect(newPet).toEqual(pet);
      done();
    });
    const req = httpTestingController.expectOne('http://localhost:3000/pets');
    expect(req.request.method).toEqual('POST');
    req.flush(pet);
  });

  test('should handle an error when adding a pet', done => {
    service.addPet().subscribe(newPet => {
      expect(newPet).toEqual({ error: 'Missing body' });
      done();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/pets');
    req.flush({ error: 'Missing body' });
  });

  test('should get all pets', done => {
    service.getPets().subscribe(allPets => {
      expect(allPets).toEqual(pets);
      done();
    });

    httpTestingController.expectOne('http://localhost:3000/pets').flush(pets);
  });

  test('should return one pet by id', done => {
    service.getPet('507f191e810c19729de860ea').subscribe(foundPet => {
      expect(foundPet).toEqual(pet);
      done();
    });

    httpTestingController
      .expectOne('http://localhost:3000/pets/507f191e810c19729de860ea')
      .flush(pet);
  });

  test('should return all organizations', done => {
    service.getOrgs().subscribe(orgs => {
      expect(orgs).toEqual(organization);
      done();
    });

    httpTestingController
      .expectOne('http://localhost:3000/orgs')
      .flush(organization);
  });

  test('should return one organization by id', done => {
    service.getOrg('507f191e810c19729de860eb').subscribe(foundOrg => {
      expect(foundOrg).toEqual(organization);
      done();
    });

    httpTestingController
      .expectOne('http://localhost:3000/orgs/507f191e810c19729de860eb')
      .flush(organization);
  });

  test('should return one user by id', done => {
    service.getUser('507f191e810c19729de860ef').subscribe(foundUser => {
      expect(foundUser).toEqual(user);
      done();
    });

    httpTestingController
      .expectOne(`http://localhost:3000/users/${user._id}`)
      .flush(user);
  });

  test('should send an adoption request', done => {
    service
      .adoptionRequest(organization._id, pet._id, user._id)
      .subscribe(response => {
        expect(response).toEqual({
          org: organization._id,
          pet: pet._id,
          user: user._id
        });
        done();
      });

    httpTestingController
      .expectOne(`http://localhost:3000/orgs/${organization._id}`)
      .flush({
        org: organization._id,
        pet: pet._id,
        user: user._id
      });
  });

  test('should accept an adoption request', done => {
    service
      .acceptAdoption('23423494z', organization._id, pet._id, user._id)
      .subscribe(adoption => {
        expect(adoption).toEqual({
          org: organization._id,
          pet: pet._id,
          query: '23423494z'
        });
        done()
      });
    httpTestingController
      .expectOne(`http://localhost:3000/users/${user._id}/accepted`)
      .flush({
        org: organization._id,
        pet: pet._id,
        query: '23423494z'
      });
  });

  xtest('should reject an adoption request', (done) => {
    service
    .acceptAdoption('23423494z', organization._id, pet._id, user._id)
    .subscribe(adoption => {
      expect(adoption).toEqual({
        org: organization._id,
        pet: pet._id,
        query: '23423494z'
      });
      done()
    });
  httpTestingController
    .expectOne(`http://localhost:3000/users/${user._id}/rejected`)
    .flush({
      org: organization._id,
      pet: pet._id,
      query: '23423494z'
    });
  });

});
