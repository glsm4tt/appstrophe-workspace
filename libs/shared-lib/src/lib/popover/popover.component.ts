import { Component, Inject, InjectionToken, TemplateRef } from "@angular/core";

export const DATA_TOKEN = new InjectionToken<string>('portal-data')

@Component({
  selector: "appstrophe-workspace-popover-container",
  template: `
    <div class="popover-container">
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </div>
  `,
  styles: [`
    div.popover-container {
      @apply text-center rounded-sm drop-shadow-md text-sm text-gray-700 dark:text-gray-300 bg-zinc-300 dark:bg-zinc-700;
    }
  `]
})
export class PopoverContainerComponent {
  
  constructor(@Inject(DATA_TOKEN) public content: TemplateRef<any>){
  }
}
