import { Component } from '@angular/core';

@Component({
  selector: 'blog-app-root',
  template: `
    <div class="bg-zinc-50 dark:bg-zinc-800 min-h-screen h-full">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'blog';
}
