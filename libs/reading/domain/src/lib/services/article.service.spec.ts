import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Mock } from '../testing/entities/mock';
import * as AngularFire from '@angular/fire/firestore';
import * as Storage from '@angular/fire/storage';

import { ArticleService } from './article.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore, DocumentReference } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp({ projectId: 'fake_test_id', storageBucket: 'fake_storage_bucket' })),
        provideStorage(() => getStorage()),
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
    const docDataSpy = jest.spyOn(AngularFire, 'docData').mockReturnValue(of(Mock.article));
    const getDownloadURLSpy = jest.spyOn(Storage, 'getDownloadURL').mockReturnValue(new Promise(resolve => resolve(Mock.articleDetailed.articleUrl)));

    const article$ = service.getOne('1');
    article$.pipe(first()).subscribe({
      next: article => {
        expect(docDataSpy).toHaveBeenCalledTimes(1);
        expect(getDownloadURLSpy).toHaveBeenCalledTimes(1);
        expect(article).toEqual(Mock.articleDetailed);
        done();
      }
    })
  });
});
