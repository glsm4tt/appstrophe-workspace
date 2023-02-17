import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'apps-read-article-body',
  template: `
    <markdown class="article-markdown prose prose-h1:text-gray-900 prose-h2:text-gray-700 prose-h3:text-gray-600 prose-h4:text-gray-500 prose-p:text-gray-700 prose-strong:text-gray-900 prose-li:text-gray-700 prose-a:text-gray-700 prose-code:text-gray-800 prose-code:bg-zinc-200 prose-code:rounded-sm prose-blockquote:text-gray-700 prose-figure:text-gray-700 prose-figcaption:text-gray-700 prose-strong:text-gray-700 prose-em:text-gray-700 prose-ul:text-gray-700 prose-table:text-gray-800 prose-thead:text-gray-800 prose-tr:text-gray-700 prose-th:text-gray-700 prose-td:text-gray-700 prose-hr:text-gray-700 dark:prose-h1:text-gray-100 dark:prose-h2:text-gray-300 dark:prose-h3:text-gray-400 dark:prose-h4:text-gray-500 dark:prose-p:text-gray-300 dark:prose-strong:text-gray-100 dark:prose-li:text-gray-300 dark:prose-a:text-gray-300 dark:prose-code:text-gray-200 dark:prose-code:bg-zinc-600 dark:prose-blockquote:text-gray-400 dark:prose-figure:text-gray-300 dark:prose-figcaption:text-gray-300 dark:prose-strong:text-gray-300 dark:prose-em:text-gray-300 dark:prose-ul:text-gray-300 dark:prose-table:text-gray-200 dark:prose-thead:text-gray-200 dark:prose-tr:text-gray-300 dark:prose-th:text-gray-300 dark:prose-td:text-gray-300 dark:prose-hr:text-gray-300 md:prose-lg lg:prose-xl xl:prose-2xl" [src]="articleUrl" ngPreserveWhitespaces></markdown>
  `,
  standalone: true,
  imports: [MarkdownModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleBodyComponent {
  @Input() articleUrl!: string;
}
