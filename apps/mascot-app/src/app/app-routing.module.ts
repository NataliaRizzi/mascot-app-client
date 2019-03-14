import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { OrgsComponent } from './orgs/orgs.component';
import { OrgDetailComponent } from './org-detail/org-detail.component';
import { NewPetComponent } from './new-pet/new-pet.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/:_id', pathMatch: 'full' },
  { path: 'user/:_id', component: UserComponent },
  { path: 'orgs', component: OrgsComponent },
  { path: 'orgs/:_id', component: OrgDetailComponent },
  { path: 'orgs/:_id/pets', component: NewPetComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
