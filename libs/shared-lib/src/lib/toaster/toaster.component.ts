import { Component, ChangeDetectionStrategy, Inject, ViewChild } from "@angular/core";
import { DATA_TOKEN } from "../popover";
import { ToasterDirective } from "./toaster.directive";
import { faCheck, faTriangleExclamation, faCircleExclamation, faCircleInfo } from '@fortawesome/free-solid-svg-icons'

export type ToasterData = { type: ToasterType, message: string };

export type ToasterType = 'success' | 'danger' | 'warning' | 'default'

@Component({
  selector: 'apps-toaster-container',
  template: `
    <div data-cy="toaster" class="toaster-container" [ngClass]="data.type">
      <fa-icon [icon]="icon"></fa-icon>
      <span>{{data.message}}</span>
    </div>
  `,
  styles: [`
    div.toaster-container {
      @apply absolute bottom-8 -translate-x-1/2 w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 py-2 px-4 flex items-center rounded-sm drop-shadow-md text-sm text-gray-700 dark:text-gray-300 bg-zinc-100 dark:bg-zinc-900 border;
    }

    div.toaster-container > fa-icon {
      @apply flex-none
    }

    div.toaster-container > span {
      @apply w-full text-center
    }

    div.toaster-container.success {
      @apply border-green-500
    }

    div.toaster-container.success > fa-icon {
      @apply text-green-500
    }

    div.toaster-container.danger {
      @apply border-red-500
    }

    div.toaster-container.danger > fa-icon {
      @apply text-red-500
    }

    div.toaster-container.warning {
      @apply border-yellow-500
    }

    div.toaster-container.warning > fa-icon {
      @apply text-yellow-500
    }

    div.toaster-container.default {
      @apply border-orange-500
    }

    div.toaster-container.default > fa-icon {
      @apply text-orange-500
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToasterComponent {

  icon: typeof faCheck | typeof faTriangleExclamation | typeof faCircleExclamation | typeof faCircleInfo

  @ViewChild(ToasterDirective, { static: true }) appsToasterHost!: ToasterDirective;

  constructor(@Inject(DATA_TOKEN) public data: ToasterData) {
    switch(data.type) {
      case 'danger':
        this.icon = faCircleExclamation
      break;
      case 'warning':
        this.icon = faTriangleExclamation
      break;
      case 'success':
        this.icon = faCheck
      break;
      case 'default':
        this.icon = faCircleInfo
      break;
      default:
        this.icon = faCircleInfo
      break;
    }
   }
}
