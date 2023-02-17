import { Component } from '@angular/core';

@Component({
  selector: 'apps-auth-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'auth';
}
