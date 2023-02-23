import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormStateDirective } from './directives/form-state/form-state.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { CopyCurrentUrlDirective } from './directives/copy-current-url/copy-current-url.directive'
import { PopoverContainerComponent } from './popover/popover.component';
import { OutsideClickDirective } from './directives/click-outside/click-outside.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { ModalContainerComponent } from './modal/modal.component';
import { ModalService } from './modal/modal.service';
import { ModalDirective } from './modal/modal.directive';
import { PopoverDirective } from './popover';
import { ToasterComponent, ToasterDirective, ToasterService } from './toaster';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, OverlayModule, FontAwesomeModule],
  declarations: [
    FormStateDirective,
    TooltipDirective,
    CopyCurrentUrlDirective,
    PopoverDirective,
    OutsideClickDirective,
    PopoverContainerComponent,
    ModalDirective,
    ModalContainerComponent,
    ToasterComponent,
    ToasterDirective
  ],
  exports: [
    FormStateDirective,
    TooltipDirective,
    CopyCurrentUrlDirective,
    PopoverDirective,
    OutsideClickDirective,
    PopoverContainerComponent,
    ModalDirective,
    ModalContainerComponent
  ],
  providers: [ModalService, ToasterService]
})
export class SharedLibModule { }
