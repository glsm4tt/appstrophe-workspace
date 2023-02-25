import { Component } from '@angular/core';
import { ShellFrameLibModule } from '@appstrophe-workspace/shell-frame-lib';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'apps-shell-root',
  template: `
    <apps-shell-header></apps-shell-header>
    <div class="flex flex-col min-h-screen">
        <div class="flex-grow">
            <router-outlet class="h-full"></router-outlet>
        </div>
        <div class="h-32 bg-gray-100"></div>
    </div>
  `,
 standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ShellFrameLibModule
  ] 
})
export class AppComponent {

  title = 'shell';
  constructor() {
    // empty
  }
}
