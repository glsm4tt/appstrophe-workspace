import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedLibModule } from '@appstrophe-workspace/shared-lib';

@Component({
  selector: 'apps-auth-root',
  standalone: true,
  imports: [
    SharedLibModule,
    RouterModule
  ],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'auth';
}
