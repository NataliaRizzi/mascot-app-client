import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material';
import { PetListComponent } from './pet-list.component';
import { PetService } from '../pet.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PetListComponent', () => {
  let component: PetListComponent;
  let fixture: ComponentFixture<PetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PetListComponent],
      imports: [MatCardModule,HttpClientTestingModule],
      providers:[ PetService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
