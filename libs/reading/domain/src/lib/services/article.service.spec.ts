import { TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { BehaviorSubject, first, of } from 'rxjs';
import { Mock } from '../mocks/entities/mock';

import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;

  const FirestoreStub = {
    collection: (name: string) => ({
      doc: (_id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
        set: (_d: any) => new Promise<void>((resolve, _reject) => resolve()),
      }),
    })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Firestore, useValue: FirestoreStub },
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
    const spy = jest.spyOn(service, 'getAll').mockReturnValue(of(Mock.articles));
    const articles$ = service.getAll();
    articles$.pipe(first()).subscribe({
      next: articles => {
        expect(spy).toHaveBeenCalled();
        expect(articles).toEqual(Mock.articles);
        done();
      }
    })
  });

  it('should get one article when getOne is called', done => {
    const spy = jest.spyOn(service, 'getOne').mockReturnValue(of(Mock.article));
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
    const comments = [Mock.comment]
    const spy = jest.spyOn(service, 'getComments').mockReturnValue(of(comments));
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
