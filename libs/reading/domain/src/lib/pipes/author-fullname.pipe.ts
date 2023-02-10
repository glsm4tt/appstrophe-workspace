import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../entities';

@Pipe({
  name: 'authorFullname',
  standalone: true
})
export class AuthorFullnamePipe implements PipeTransform {

  private titleCase = (string: string) => {
    let formatted = string.split(' ').map(s => this.upperCaseFirstLetter(s)).join(' ')
    if(formatted.includes('-')) formatted = string.split('-').map(s => this.upperCaseFirstLetter(s)).join('-')
    return formatted
  }

  private upperCaseFirstLetter = (string: string) =>
    `${string.slice(0, 1).toUpperCase()}${string.slice(1)}`;

  transform(value: Author): string {
    if(value?.firstname || value?.name)
      return `${this.titleCase(value?.firstname?.toLocaleLowerCase())} ${value?.name?.toLocaleUpperCase()}`;
    return value?.alias;  
  }

}
