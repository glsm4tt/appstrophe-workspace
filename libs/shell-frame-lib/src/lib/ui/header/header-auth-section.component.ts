import { Component, Input, OnChanges, SimpleChanges, ViewChild, inject, OnInit } from '@angular/core';
import { faUser, faUserAstronaut, faGears, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { User } from '@angular/fire/auth';
import { PopoverDirective } from '@appstrophe-workspace/shared-lib';
import { NavigationEnd, Router } from '@angular/router';
import { EMPTY, filter, map, Observable, tap } from 'rxjs';

@Component({
    selector: 'apps-shell-header-auth-section',
    template: `
    <ng-container *ngIf="activeRoute$ | async as route">
        <ng-container *ngIf="user; else not_connected">
            <li *ngIf="innerWidth >= 768; else user_settings_list" [ngClass]="{'active': route === 'auth'}" class="py-2 px-8 transform duration-300 ease-in-out cursor-pointer border-b-2 border-transparent active"
                appsPopover [popoverContent]="user_settings_popover">
                <fa-icon [icon]="faUserAstronaut"></fa-icon>
            </li>
            <ng-template #user_settings_list>
                <li [ngClass]="{'popover-active': isSettingsOpen}" [ngClass]="{'active': route === 'auth'}" class="py-2 px-8 transform duration-300 ease-in-out cursor-pointer border-b-2 border-transparent"
                (click)="isSettingsOpen = !isSettingsOpen">
                    <fa-icon [icon]="faUserAstronaut"></fa-icon>
                    <ng-container *ngIf="isSettingsOpen">
                        <ng-container *ngTemplateOutlet="user_settings_popover"></ng-container>
                    </ng-container>
                </li>
            </ng-template>
        </ng-container>
    
        <ng-template #not_connected>
            <li [routerLink]="['/auth']" routerLinkActive="active">
                <fa-icon [icon]="faUser"></fa-icon>
            </li>
        </ng-template>

        <ng-template #user_settings_popover>
            <ul>
                <li>
                    <a role="button" [routerLink]="['/auth/user-settings']" routerLinkActive="active" (click)="popover?.detachOverlay()"
                        class="flex items-center justify-start py-2 px-2 transform duration-300 ease-in-out cursor-pointer border-transparent md:px-4 md:justify-center md:hover:bg-zinc-400 dark:md:hover:bg-zinc-600">
                        <fa-icon class="mr-2" [icon]="faGears"></fa-icon>
                        Settings
                    </a>
                </li>
                <li role="button" class="flex items-center justify-start py-2 px-2 transform duration-300 ease-in-out cursor-pointer border-transparent md:px-4 md:justify-center md:hover:bg-zinc-400 dark:md:hover:bg-zinc-600">
                    <fa-icon class="mr-2" [icon]="faRightFromBracket"></fa-icon>
                    Disconect
                </li>
            </ul>
        </ng-template>
    </ng-container>
  `,
    styles: [`
        li.active {
            @apply border-l-4 md:border-l-0 border-orange-500 text-orange-500 bg-orange-100 md:bg-white md:dark:bg-zinc-900
        }

        li.popover-active > fa-icon {
            @apply text-orange-500
        }
  `]
})
export class HeaderAuthSectionComponent implements OnInit, OnChanges {

    @ViewChild(PopoverDirective) popover: PopoverDirective;

    @Input() innerWidth: number;
    @Input() user: User | null;

    readonly faUser = faUser;
    readonly faUserAstronaut = faUserAstronaut;
    readonly faGears = faGears;
    readonly faRightFromBracket = faRightFromBracket;

    public isSettingsOpen = false;
    public activeRoute$: Observable<string> = EMPTY;

    private _router = inject(Router);

    constructor() {
        // empty
    }

    ngOnInit() {
        this.activeRoute$ = this._router.events.pipe(
            filter(event => event instanceof NavigationEnd ),
            map(event => (event as NavigationEnd).url.split('/').filter(segment => !!segment).at(0))
        )
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['innerWidth']?.currentValue < 768) this.popover?.detachOverlay();
    }
}
