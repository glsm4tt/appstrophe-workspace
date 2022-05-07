import { Component, HostListener, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'appstrophe-workspace-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  readonly faBars = faBars;
  readonly title = 'appstrophe';

  public innerWidth = window.innerWidth;
  public isOpen = false;
  public routerLinks: { label: string, route: string }[] = [{ label: 'Blog', route: '/blog' },
  { label: 'Who we are', route: '/who-we-are' },
  { label: 'Contact', route: '/contact' },
  { label: 'Login', route: '/auth' }];

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
