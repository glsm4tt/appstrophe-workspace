import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Contact, ContactCardComponent } from '../../ui/contact-card/contact-card.component';

@Component({
  selector: 'apps-shell-contact-page',
  standalone: true,
  template: `
    <div class="mx-2 my-16 md:my-24 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <apps-shell-contact-card *ngFor="let contact of contacts" [contact]="contact"></apps-shell-contact-card>
    </div>
  `,
  styles: [`
    :host {
        @apply flex flex-col items-center justify-center;
      }
  `],
  imports: [NgFor, ContactCardComponent]
})
export class ContactPageComponent {

  contacts: Contact[] = [
    {
      href: 'https://twitter.com/DedieuS',
      text: '@DedieuS',
      img: 'assets/img/twitter_logo.png',
      imgAlt: 'The twitter logo (a blue bird)'
    },
    {
      href: 'mailto:appstrophe@gmail.com',
      text: 'appstrophe@gmail.com',
      img: 'assets/img/gmail_logo_512.png',
      imgAlt: 'The gmail logo (a blue, red, yellow green M)'
    },
    {
      href: 'https://github.com/sdedieu',
      text: 'sdedieu',
      img: 'assets/img/github_logo.png',
      imgAlt: 'The github logo (a black and white cat)'
    }
  ];
}
