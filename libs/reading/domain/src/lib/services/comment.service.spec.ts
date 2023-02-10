import { TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { Mock } from '../testing';
import * as AngularFire from '@angular/fire/firestore';

import { CommentService } from './comment.service';
import { first } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService, AuthServiceStub } from '@appstrophe-workspace/auth-lib';
import { User } from '@angular/fire/auth';
import { Reaction, Comment } from '../entities';

describe('CommentService', () => {
  let service: CommentService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp({ projectId: 'fake_test_id' })),
        provideFirestore(() => getFirestore())
      ],
      providers: [
        { provide: AuthService, useValue: AuthServiceStub },
      ]
    });
    service = TestBed.inject(CommentService);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    // reset all spies
    jest.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all comments of an article when getComments is called', done => {
    const comments: Comment[] = [Mock.comment].map(c => ({ ...c, reactions: [] }));
    const spy = jest.spyOn(AngularFire, 'collectionData').mockReturnValue(of(comments));
    authService.user$ = of({uid: '123'} as User)
    const comments$ = service.getComments('1');
    comments$.pipe(first()).subscribe({
      next: _comments => {
        expect(spy).toHaveBeenCalled();
        expect(_comments).toEqual(comments);
        done();
      }
    })
  });

  it('should call addDoc when addComment is called', async () => {
    const spy = jest.spyOn(AngularFire, 'addDoc').mockReturnValue(new Promise(resolve => resolve(null)));
    await service.addComment('1', 'test');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything(), { text: 'test' });
  });

  it('should call addDoc when likeComment is called', async () => {
    const spy = jest.spyOn(AngularFire, 'setDoc').mockReturnValue(new Promise(resolve => resolve(null)));
    await service.likeComment('1', '2', '3');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything(), { type: 'like' });
  });

  it('should call addDoc when unlikeComment is called', async () => {
    const spy = jest.spyOn(AngularFire, 'deleteDoc').mockReturnValue(new Promise(resolve => resolve(null)));
    await service.unlikeComment('1', '2', '3');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything());
  });
});
