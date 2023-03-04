import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'apps-blog-root',
  standalone: true,
  imports: [
    RouterModule
  ],
  template: `
    <div class="bg-zinc-50 dark:bg-zinc-800 min-h-screen h-full">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'blog';
}
