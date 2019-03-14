import { getGreeting } from '../support/app.po';

describe('Hello Nx', () => {
  beforeEach(() => cy.visit('/orgs'));

  it('should display welcome message', () => {
    cy.screenshot()
    getGreeting().contains('Welcome to mascot-app!');
  });
});
