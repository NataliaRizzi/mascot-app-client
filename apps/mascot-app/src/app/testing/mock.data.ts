import { Pet } from '../models/pet.model';
import { User } from '../models/user.model';
import { Org } from '../models/org.model';

export const pet: Pet = {
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

export const user: User = {
    _id: '507f191e810c19729de860ef',
    name: 'Pitbull',
    email: 'pitbull@gmail.com',
    location: 'Barcelona',
    pets: [],
    messages: []
}

export const organization: Org = {
    _id: '507f191e810c19729de860eb',
    name: 'Help WOW',
    location: 'Barcelona',
    email: 'helpwow@gmail.com',
    web: 'www.helpwow.com',
    queries: [{accepted:false,
      _id:'5c82a25465c1a314b22b2135',
      user:'5b005cecd5de87305632855b',
      pet:'5c7ffd00828f0f89ba7f366f'}],
    pets: [{ pet_id: '507f191e810c19729de860ea' }]
}
