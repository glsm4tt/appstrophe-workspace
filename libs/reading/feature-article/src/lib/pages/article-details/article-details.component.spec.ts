import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { RouterTestingModule } from '@angular/router/testing';
import { MarkdownModule } from 'ngx-markdown';

import { ArticleDetailsComponent } from './article-details.component';
import { AuthService } from '@appstrophe-workspace/auth-lib';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

describe('ArticleDetailsComponent', () => {
  let component: ArticleDetailsComponent;
  let fixture: ComponentFixture<ArticleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArticleDetailsComponent, 
        HttpClientModule, 
        MarkdownModule.forRoot({loader: HttpClient}),
        RouterTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        {provide: AuthService, useValue: {}}
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
