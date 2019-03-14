import { Injectable } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Pet } from './models/pet.model';
import { User } from './models/user.model';
import { Org } from './models/org.model';

@Injectable()
export class PetService {
  private petUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private handleAngularJsonBug(error: HttpErrorResponse) {
    const JsonParseError = 'Http failure during parsing for';
    const matches = error.message.match(new RegExp(JsonParseError, 'ig'));

    if (error.status === 200 && matches.length === 1) {
      // return obs that completes;
      return empty();
    } else {
      return Observable.throw(error); // re-throw
    }
  }

  addPet(pet: Pet): Observable<Pet> {
    return this.http
      .post<Pet>(`${this.petUrl}/pets`, pet)
      .pipe(catchError((error: HttpErrorResponse) => this.handleAngularJsonBug(error)));
  }

  getPets(): Observable<Pet[]> {
    return this.http
      .get<Pet[]>(`${this.petUrl}/pets`)
      .pipe(catchError((error: HttpErrorResponse) => this.handleAngularJsonBug(error)));
  }

  getPet(id: string): Observable<Pet> {
    const url = `${this.petUrl}/pets/${id}`;
    return this.http.get<Pet>(url)
    .pipe(catchError((error: HttpErrorResponse) => this.handleAngularJsonBug(error)));
  }

  getOrgs(): Observable<Org[]> {
    return this.http
      .get<Org[]>(`${this.petUrl}/orgs`)
      .pipe(catchError((error: HttpErrorResponse) => this.handleAngularJsonBug(error)));
  }

  getOrg(id: String): Observable<Org> {
    const url = `${this.petUrl}/orgs/${id}`;
    return this.http.get<Org>(url)
    .pipe(catchError((error: HttpErrorResponse) => this.handleAngularJsonBug(error)));
  }

  getUser(id: String): Observable<User> {
    const url = `${this.petUrl}/users/${id}`;
    return this.http.get<User>(url)
    .pipe(catchError((error: HttpErrorResponse) => this.handleAngularJsonBug(error)));
  }

  adoptionRequest(org: String, pet: String, user: String): Observable<Org> {
    const url = `${this.petUrl}/orgs/${org}`;
    const adoptionReq = { org, pet, user };
    return this.http.put<Org>(url, adoptionReq)
    .pipe(catchError((error: HttpErrorResponse) => this.handleAngularJsonBug(error)));
  }

  acceptAdoption(query: String, org: String, pet: String, user: String): Observable<User> {
    const url = `${this.petUrl}/users/${user}/accepted`;
    const approvalRes = { org, pet, query };
    return this.http.put<User>(url, approvalRes)
    .pipe(catchError((error: HttpErrorResponse) => this.handleAngularJsonBug(error)));
  }

  // rejectAdoption(query: String, org: String, pet: String, user: String): Observable<User> {
  //   const url = `${this.petUrl}/users/${user}/rejected`;
  //   const rejectionRes = { org, pet, query };
  //   return this.http.put<User>(url, rejectionRes)
  //   .pipe(catchError((error: HttpErrorResponse) => this.handleAngularJsonBug(error)));
  // }

  // markAsRead(_id, user): Observable<User> {
  //   const url = `${this.petUrl}/users/${user}/markAsRead`;
  //   const message = { _id, read: true };
  //   return this.http.put<User>(url, message)
  //   .pipe(catchError((error: HttpErrorResponse) => this.handleAngularJsonBug(error)));
  // }
}
