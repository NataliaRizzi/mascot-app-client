import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PetService } from '../pet.service';
import { OrgsComponent } from './orgs.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrgsComponent', () => {
  let component: OrgsComponent;
  let fixture: ComponentFixture<OrgsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [OrgsComponent],

      providers: [PetService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
