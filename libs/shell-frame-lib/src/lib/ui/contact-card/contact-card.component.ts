import { Component, Input } from '@angular/core';

export interface Contact {
    href: string,
    text: string,
    img: string,
    imgAlt: string
}

@Component({
  selector: 'apps-shell-contact-card',
  standalone: true,
  template: `
    <div class="relative bg-white dark:bg-zinc-900 shadow-xl rounded-lg mt-12">
        <div class="absolute w-full flex justify-center -mt-6">
            <a [href]="contact?.href">
                <img class="w-10 h-8" [src]="contact?.img" [alt]="contact?.imgAlt">
            </a>
        </div>
        <a [href]="contact?.href">
          <div class="py-4 px-8 cursor-pointer">
              <h2 class="text-lg font-semibold">{{contact?.text}}</h2>
          </div>
        </a>
    </div>
  `,
  styles: [`
    :host {
        @apply py-4 flex flex-col items-center;
      }
  `]
})
export class ContactCardComponent {
    @Input() contact: Contact;
}
