import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NewPetComponent } from './new-pet.component';
import {PetService} from '../pet.service'
import { HttpClientTestingModule} from '@angular/common/http/testing';

describe('NewPetComponent', () => {
  let component: NewPetComponent;
  let fixture: ComponentFixture<NewPetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPetComponent ],
      imports :[RouterTestingModule, FormsModule,HttpClientTestingModule],
      providers: [PetService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
