import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PetService } from '../pet.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OrgDetailComponent } from './org-detail.component';

describe('OrgDetailComponent', () => {
  let component: OrgDetailComponent;
  let fixture: ComponentFixture<OrgDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,HttpClientTestingModule],
      providers: [PetService],
      declarations: [OrgDetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
