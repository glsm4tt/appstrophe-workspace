import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCardComponent } from './article-card.component';

describe('ArticleCardComponent', () => {
  let component: ArticleCardComponent;
  let fixture: ComponentFixture<ArticleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // reset all spies
    jest.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger the component clicked event on avatar click', () => {
    const spy = jest.spyOn(component.clicked, 'emit');
    const articleCardComponentElement: HTMLElement = fixture.nativeElement;
    const avatarImageElement: HTMLImageElement = articleCardComponentElement.querySelector('.card_avatar__img');

    avatarImageElement.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(component.article)
  });

  it('should trigger the component clicked event on card body click', () => {
    const spy = jest.spyOn(component.clicked, 'emit');
    const articleCardComponentElement: HTMLElement = fixture.nativeElement;
    const cardBodyElement: HTMLDivElement = articleCardComponentElement.querySelector('.card_body');

    cardBodyElement.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(component.article)
  });

  it('should trigger the component clicked event on card footer click', () => {
    const spy = jest.spyOn(component.clicked, 'emit');
    const articleCardComponentElement: HTMLElement = fixture.nativeElement;
    const cardFooterElement: HTMLDivElement = articleCardComponentElement.querySelector('.card_footer');

    cardFooterElement.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(component.article)
  });
});
