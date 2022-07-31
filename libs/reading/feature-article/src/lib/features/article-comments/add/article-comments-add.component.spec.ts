import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ArticleCommentsAddComponent } from './article-comments-add.component';

describe('ArticleCommentsAddComponent', () => {
  let component: ArticleCommentsAddComponent;
  let fixture: ComponentFixture<ArticleCommentsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArticleCommentsAddComponent,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        AngularFireModule.initializeApp({}),
        RouterTestingModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCommentsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
