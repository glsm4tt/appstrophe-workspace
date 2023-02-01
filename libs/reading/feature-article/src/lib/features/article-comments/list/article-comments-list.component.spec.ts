import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@appstrophe-workspace/auth-lib';

import { ArticleCommentsListComponent } from './article-comments-list.component';

describe('ArticleCommentsListComponent', () => {
  let component: ArticleCommentsListComponent;
  let fixture: ComponentFixture<ArticleCommentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArticleCommentsListComponent
      ],
      providers: [
        {provide: AuthService, useValue: {}}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCommentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
