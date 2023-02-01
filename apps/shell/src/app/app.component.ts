import { Component } from '@angular/core';
import { ShellFrameLibModule } from '@appstrophe-workspace/shell-frame-lib';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'appstrophe-workspace-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
