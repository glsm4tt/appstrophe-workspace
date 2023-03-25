import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'apps-shell-about-page',
  standalone: true,
  template: `
    <h1>About me</h1>
    <div class="card">
      <div class="card_avatar">
          <img class="card_avatar__img" src="assets/img/W9aoBmrb_400x400.jpeg" alt="Photo de Sylvain DEDIEU">
      </div>
      <div class="card_body">
          <h2 class="card_title">Title</h2>
          <div class="card_content">
              <p class="card_content__text text-fade">Description</p>
          </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      @apply py-4 flex flex-col items-center;
    }

    div.card {
      @apply w-5/6 relative bg-white dark:bg-zinc-900 shadow-xl rounded-lg mt-32
    }

    div.card > div.card_avatar {
      @apply absolute w-full flex justify-center -mt-28
    }

    div.card > div.card_avatar > img {
      @apply w-32 h-32 object-cover rounded-full border-2 border-orange-500
    }

    div.card > div.card_body {
      @apply pt-4 px-8 cursor-pointer
    }

    div.card > div.card_body > h2.card_title {
      @apply text-gray-800 dark:text-gray-300 text-2xl font-semibold
    }

    div.card > div.card_body > div.card_content {
      @apply mt-2 text-gray-600 flex flex-row items-center
    }

    div.card > div.card_body > div.card_content p.card_content__text {
      @apply h-32
    }

    div.card > div.card_body > div.card_content > p.card_content__text.text-fade {
      @apply bg-clip-text text-transparent bg-gradient-to-b from-gray-600 
    }
  `]
})
export class AboutPageComponent implements OnInit {

  constructor() {
    // empty
  }

  ngOnInit(): void {
    // empty
  }
}
