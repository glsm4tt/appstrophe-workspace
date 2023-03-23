import { TestBed } from '@angular/core/testing';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore, DocumentReference, Query } from '@angular/fire/firestore';
import { Mock } from '../testing';
import * as AngularFire from '@angular/fire/firestore';

import { CommentService } from './comment.service';
import { first } from 'rxjs/operators';
import { of } from 'rxjs';
import { IdTokenResult, User } from '@angular/fire/auth';
import { Comment } from '../entities';
import { AppStropher, AuthService, AuthServiceStub } from '@appstrophe-workspace/auth/domain';

const fakeUser: AppStropher = {
  uid: '1',
  emailVerified: false,
  isAnonymous: false,
  metadata: undefined,
  providerData: [],
  refreshToken: '',
  tenantId: '',
  delete: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  getIdToken: function (_forceRefresh?: boolean): Promise<string> {
    throw new Error('Function not implemented.');
  },
  getIdTokenResult: function (_forceRefresh?: boolean): Promise<IdTokenResult> {
    throw new Error('Function not implemented.');
  },
  reload: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  toJSON: function (): object {
    throw new Error('Function not implemented.');
  },
  displayName: '',
  email: '',
  phoneNumber: '',
  photoURL: '',
  providerId: ''
}

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const spy = jest.spyOn(AngularFire, 'collectionData').mockImplementation((_query: Query<unknown>, _options?: {
      idField?: string
  }) => _query.type === 'query' ? of(comments) : of([])) 
    const userSpy = jest.spyOn(authService, 'getConnectedUser').mockReturnValue(of(fakeUser));
    const comments$ = service.getComments('1');
    comments$.pipe(first()).subscribe({
      next: _comments => {
        expect(spy).toHaveBeenCalled();
        expect(userSpy).toHaveBeenCalledTimes(1);
        expect(_comments).toEqual(comments);
        done();
      }
    })
  });

  it('should call addDoc when addComment is called', async () => {
    const docRef = { } as DocumentReference<unknown>;
    const authSpy = jest.spyOn(authService, 'getConnectedUser').mockReturnValue(of(fakeUser))
    const spy = jest.spyOn(AngularFire, 'addDoc').mockReturnValue(new Promise(resolve => resolve(docRef)));
    await service.addComment('1', 'test');
    expect(authSpy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything(), { text: 'test', author: { id: fakeUser.uid } });
  });

  it('should call setDoc when likeComment is called', async () => {
    const spy = jest.spyOn(AngularFire, 'setDoc').mockReturnValue(new Promise(resolve => resolve()));
    await service.likeComment('1', '2', '3');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything(), { type: 'like' });
  });

  it('should call deleteDoc when unlikeComment is called', async () => {
    const spy = jest.spyOn(AngularFire, 'deleteDoc').mockReturnValue(new Promise(resolve => resolve()));
    await service.unlikeComment('1', '2', '3');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything());
  });

  it('should call deleteDoc when unlikeComment is called', async () => {
    const spy = jest.spyOn(AngularFire, 'deleteDoc').mockReturnValue(new Promise(resolve => resolve()));
    await service.delete('1', '2');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything());
  });
});
