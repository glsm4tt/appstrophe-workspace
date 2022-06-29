import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'appstrophe-workspace-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        display: 'block'
      })),
      state('closed', style({
        display: 'none'
      })),
      state('large', style({
        display: 'flex'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0s')
      ]),
    ]),
  ]
})
export class HeaderComponent implements OnInit {
  readonly faBars = faBars;
  readonly faUser = faUser;
  readonly title = 'appstrophe';

  public innerWidth = window.innerWidth;
  public isOpen = false;
  public routerLinks: { label: string, route: string }[] = [{ label: 'Blog', route: '/blog' },
  { label: 'Who we are', route: '/who-we-are' },
  { label: 'Contact', route: '/contact' },
  /*{ label: 'Login', route: '/auth' }*/];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  constructor() {
    // empty
  }

  ngOnInit(): void {
    // empty
  }
}
