import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, first, of } from 'rxjs';
import { Mock } from '../testing/entities/mock';
import * as AngularFire from '@angular/fire/firestore';

import { ArticleService } from './article.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

fdescribe('ArticleService', () => {
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
    const spy = jest.spyOn(AngularFire, 'docData').mockReturnValue(of(Mock.articleDto));
    const article$ = service.getOne('1');
    article$.pipe(first()).subscribe({
      next: article => {
        expect(spy).toHaveBeenCalled();
        expect(article).toEqual(Mock.article);
        done();
      }
    })
  });

  it('should get all comments of an article when getComments is called', done => {
    const comments = [Mock.comment];
    const spy = jest.spyOn(AngularFire, 'collectionData').mockReturnValue(of(comments));
    const comments$ = service.getComments('1');
    comments$.pipe(first()).subscribe({
      next: _comments => {
        expect(spy).toHaveBeenCalled();
        expect(_comments).toEqual(comments);
        done();
      }
    })
  });
});
