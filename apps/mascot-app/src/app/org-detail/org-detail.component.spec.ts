import {
  Spectator, // Spectator - for typing
  createTestComponentFactory
} from '@netbasal/spectator/jest';
import { RouterTestingModule } from '@angular/router/testing';
import { PetService } from '../pet.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { OrgDetailComponent } from './org-detail.component';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../testing/activated-route-stub';
import { organization } from '../testing/mock.data';
import { TestBed } from '@angular/core/testing';

describe('OrgDetail', () => {
  let spectator: Spectator<OrgDetailComponent>;
  let activatedRoute: ActivatedRouteStub;
  let httpClient: HttpTestingController;

  const createComponent = createTestComponentFactory({
    component: OrgDetailComponent,
    imports: [RouterTestingModule, HttpClientTestingModule],
    providers: [
      PetService,
      {
        provide: ActivatedRoute,
        useFactory: () => {
          activatedRoute = new ActivatedRouteStub();
          return activatedRoute;
        }
      }
    ],
    detectChanges: false
  });

  beforeEach(() => {
    spectator = createComponent();
    httpClient = TestBed.get(HttpTestingController);
    activatedRoute.setParamMap({ _id: '507f191e810c19729de860eb' });
    spectator.detectChanges();
    httpClient
      .expectOne('http://localhost:3000/orgs/507f191e810c19729de860eb')
      .flush(organization);
    spectator.detectChanges();
  });

  it('Should contain name, ', () => {
    const html = spectator.debugElement.nativeElement.innerHTML;
    expect(html).toContain('Help WOW');
    expect(html).toContain('Barcelona');
    expect(html).toContain('www.helpwow.com');
    expect(html).toContain('helpwow@gmail.com');
  });
});
