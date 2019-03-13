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


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
