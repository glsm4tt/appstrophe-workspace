import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Mock } from '../testing/entities/mock';
import * as AngularFire from '@angular/fire/firestore';

import { ArticleService } from './article.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore, DocumentReference, Query } from '@angular/fire/firestore';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp({ projectId: 'fake_test_id' })),
        provideFirestore(() => getFirestore())
      ]
    });
    service = TestBed.inject(ArticleService);
  });

  afterEach(() => {
    // reset all spies
    jest.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all articles when getAll is called', done => {
    const spy = jest.spyOn(AngularFire, 'collectionData').mockReturnValue(of(Mock.articleDtoList));
    const articles$ = service.getAll();
    articles$.pipe(first()).subscribe({
      next: articles => {
        expect(spy).toHaveBeenCalled();
        expect(articles).toEqual(Mock.articleList);
        done();
      }
    })
  });

  it('should get one article when getOne is called', done => {
    const docDataSpy = jest.spyOn(AngularFire, 'docData').mockImplementation((ref: DocumentReference<unknown>, options?: { idField?: string; }) => {
      switch(ref.path) {
        case 'articles/1':
          return of(Mock.article);

        case 'articles/1/metadata/1':
          return of(Mock.articleMetadata);

        default: 
          return of(null);
      }
    });

    const article$ = service.getOne('1');
    article$.pipe(first()).subscribe({
      next: article => {
        expect(docDataSpy).toHaveBeenCalledTimes(2);
        expect(article).toEqual(Mock.articleDetailed);
        done();
      }
    })
  });
});
