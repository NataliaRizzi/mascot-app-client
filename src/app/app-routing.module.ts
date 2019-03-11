import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { OrgsComponent } from './orgs/orgs.component';
import { OrgDetailComponent } from './org-detail/org-detail.component';
import { PetComponent } from './pet/pet.component';
import { NewPetComponent } from './new-pet/new-pet.component';
import { PetListComponent } from './pet-list/pet-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user/:_id', component: UserComponent },
  { path: 'user/:_id', component: UserDetailComponent },
  { path: 'orgs', component: OrgsComponent },
  { path: 'orgs/:_id', component: OrgDetailComponent },
  { path: 'orgs/:_id/pets', component: NewPetComponent },
  // { path: 'pets/:_userId/:_petId', component: PetComponent },
  { path: 'pets', component: PetListComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
