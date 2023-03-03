import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { faBars, faUser, faUserAstronaut, faGears, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { EMPTY, Observable } from 'rxjs';
import { User } from '@angular/fire/auth';
import { AuthService } from '@appstrophe-workspace/auth/domain';
import { PopoverDirective } from '@appstrophe-workspace/shared-lib';

@Component({
  selector: 'apps-shell-header',
  template: `
    <header class="z-50 bg-zinc-50 dark:bg-zinc-800 shadow px-0 py-2 text-gray-700 dark:text-gray-300 sticky top-0 md:flex md:items-center md:space-x-4 md:px-3" 
      (outsideClick)="isOpen = false" appstropheWorkspaceOutsideClick #menu>
      <div class="px-4 flex items-center cursor-pointer md:px-0"
      [class.text-orange-500]="isOpen"
      (click)="$event.stopPropagation(); isOpen = innerWidth < 768 ? !isOpen : isOpen">
          <fa-icon class="font-bold block mr-4 md:cursor-default md:hidden" [icon]="faBars"></fa-icon>
          <h1 class="font-bold md:mr-12 md:cursor-default md:block">{{title | titlecase}}</h1>
      </div>
      <ul class="mt-2 transition-all transform delay-75 opacity-0 h-0 duration-300 ease-in-out md:h-content md:opacity-100 md:mt-0 md:space-y-0 md:flex md:items-center md:justify-between md:flex-grow"
          [class.opacity-100]="isOpen && innerWidth < 768" 
          [class.h-fit]="isOpen && innerWidth < 768"
          [@openClose]="innerWidth < 768 ? isOpen ? 'open' : 'closed' : 'large'">
        <li *ngFor="let link of routerLinks" [routerLink]="[link.route]" routerLinkActive="active"
          class="py-2 px-4 transform duration-300 ease-in-out cursor-pointer md:px-8 md:border-b-2 border-transparent">
          {{link.label}}
        </li>
        <apps-shell-header-auth-section [user]="user$ | async" [innerWidth]="innerWidth"></apps-shell-header-auth-section>
      </ul>
    </header>
  `,
  styles: [`
    li.active {
      @apply border-l-4 md:border-l-0 border-orange-500 text-orange-500 bg-orange-100 md:bg-white md:dark:bg-zinc-900
    }
  `],
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

  @ViewChild(PopoverDirective) popover: PopoverDirective;

  readonly faBars = faBars;
  readonly faUser = faUser;
  readonly faUserAstronaut = faUserAstronaut;
  readonly faGears = faGears;
  readonly faRightFromBracket = faRightFromBracket;
  readonly title = 'appstrophe';

  public innerWidth = window.innerWidth;
  public isOpen = false;
  public isSettingsOpen = false;
  public routerLinks: { label: string, route: string }[] = [
    { label: 'Blog', route: '/blog' },
    { label: 'Who we are', route: '/who-we-are' },
    { label: 'Contact', route: '/contact' }
  ];
  public user$: Observable<User | null> = EMPTY;

  private authService = inject(AuthService);

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    if (innerWidth < 768) this.popover?.detachOverlay();
  }

  constructor() {
    // empty
  }

  ngOnInit(): void {
    this.user$ = this.authService.getConnectedUser();
  }
}
