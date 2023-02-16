import { ComponentType } from "@angular/cdk/portal";
import { Component, ChangeDetectionStrategy, Inject, ViewChild, AfterViewInit, Input } from "@angular/core";
import { DATA_TOKEN } from "../popover";
import { ModalDirective } from "./modal.directive";


@Component({
  selector: 'appstrophe-workspace-modal-container',
  template: `
    <div class="modal-container" [ngClass]="size">
      <ng-template modalHost></ng-template>
    </div>
  `,
  styles: [`
    div.modal-container {
      @apply absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 flex flex-col rounded-sm drop-shadow-md text-sm text-gray-700 dark:text-gray-300 bg-zinc-300 dark:bg-zinc-700;
    }

    div.modal-container.sm {
      @apply w-1/4
    }

    div.modal-container.md {
      @apply w-1/2
    }

    div.modal-container.lg {
      @apply w-3/4
    }

    div.modal-container.xl {
      @apply w-5/6
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalContainerComponent implements AfterViewInit {

  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @ViewChild(ModalDirective, { static: true }) modalHost!: ModalDirective;

  constructor(@Inject(DATA_TOKEN) public component: ComponentType<unknown>) { }

  ngAfterViewInit(): void {
    const viewContainerRef = this.modalHost?.viewContainerRef;
    viewContainerRef?.clear();

    viewContainerRef?.createComponent<unknown>(this.component);
  }
}
