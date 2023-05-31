import { Component } from '@angular/core';

@Component({
  selector: 'apps-loader',
  standalone: true,
  template: `
  <div class="lds-ellipsis">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
  `,
  styles: [`
  .lds-ellipsis {
    @apply inline-block relative w-20 h-20;
  }
  .lds-ellipsis div {
    @apply absolute top-8 w-3.5 h-3.5 rounded-2xl bg-gray-300 ease-in-out;
  }
  .lds-ellipsis div:nth-child(1) {
    @apply left-2;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    @apply left-2;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    @apply left-8;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    @apply left-14;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }  
  `],
})
export class LoaderComponent { }
