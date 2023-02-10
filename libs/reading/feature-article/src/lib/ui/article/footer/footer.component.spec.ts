import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ArticleFooterComponent } from './footer.component';

describe('ArticleFooterComponent', () => {
  let component: ArticleFooterComponent;
  let fixture: ComponentFixture<ArticleFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArticleFooterComponent,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
