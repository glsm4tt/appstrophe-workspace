import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'apps-shell-about-page',
  standalone: true,
  template: `
    <div class="card">
      <div class="card_avatar">
          <img class="card_avatar__img" src="assets/img/W9aoBmrb_400x400.jpeg" alt="Photo de Sylvain DEDIEU">
      </div>
      <div class="card_body">
          <h2 class="card_title">Welcome to my blog ! <br><span class="italic">Bienvenue sur mon blog !</span></h2>
          <div class="card_content">
              <p class="card_content__text">
                My name is Sylvain DEDIEU, I work as a senior frontend developer and I'm truly passionate about Web development. <br>
                But above all, I'm devoted to learning and sharing. That's why I also teach at the University of Grenoble (UGA) and occasionally give some talks in conferences.<br>
                And that is the reason for this Website. <br>
                As I learn and master things, I want to spread this new knowledge. I believe that, the most developers understand how things should be used, the more we will have better products and a better quality of life. <br><br>
              </p>
              <p class="card_content__text italic">
                Je m'appelle Sylvain DEDIEU, véritable passionné du monde du développement Web, j'occupe actuellement un poste de développeur senior spécialisé dans le frontend.<br>
                Et ce qui m'interesse le plus dans cette vocation, c'est l'apprentissage et le partage. C'est pourquoi j'enseigne également à l'université de Grenoble (UGA) et donne occasionnellement des talks dans des conférences.<br> 
                C'est ici toute la raison de ce site Web.<br>
                Au fur et à mesure que j'apprends de nouvelles choses, j'ai envie d'en faire partager au plus grand monde.<br>
                Car je suis persuadé que, plus les développeurs apprendront comment les outils qu'ils utilisent fonctionnent, plus on aura des produits bien fait et une meilleure qualité de vie. </p>
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
      @apply py-4 px-8 cursor-pointer
    }

    div.card > div.card_body > h2.card_title {
      @apply text-2xl font-semibold
    }

    div.card > div.card_body > h2.card_title > span.italic {
      @apply text-xl
    }

    div.card > div.card_body > div.card_content {
      @apply my-3 text-gray-500 flex flex-col items-center
    }

    div.card > div.card_body > div.card_content p.card_content__text > span.italic {
      @apply text-sm
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
