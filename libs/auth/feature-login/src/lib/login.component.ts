import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'apps-login',
  standalone: true,
  imports: [
    RouterModule
  ],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AuthLoginComponent {
}
