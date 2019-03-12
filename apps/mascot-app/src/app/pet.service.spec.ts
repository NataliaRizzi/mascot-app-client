import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PetService } from './pet.service';

describe('PetService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const pet = {
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
    organization: '507f191e810c19729de860eb'
  };
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

    httpClient = TestBed.get(HttpClient);
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

  test('should handle an error when adding a pet', (done) => {
    service.addPet().subscribe(newPet => {
      expect(newPet).toEqual({"error": "Missing body"});
      done();
    })
    const req = httpTestingController.expectOne('http://localhost:3000/pets');
    req.flush({error:'Missing body' });


  });

  test('should get all pets', done => {

    service.getPets().subscribe(allPets => {
      expect(allPets).toEqual(pets);
      done();
    });

    httpTestingController.expectOne('http://localhost:3000/pets').flush(pets);
  });

  test('should return one pet by id', (done) => {
    service.getPet('507f191e810c19729de860ea').subscribe(pet => {
      expect(pet).toEqual(pet);
      done();
    });

    httpTestingController.expectOne('http://localhost:3000/pets/507f191e810c19729de860ea').flush(pet);  });
});
