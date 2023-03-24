import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Mock } from '../testing/entities/mock';
import * as AngularFire from '@angular/fire/firestore';
import * as Storage from '@angular/fire/storage';

import { ArticleService } from './article.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthService, AuthServiceStub } from '@appstrophe-workspace/auth/domain';

describe('ArticleService', () => {
  let service: ArticleService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp({ 
          apiKey: "API_KEY",
          authDomain: "AUTH_DOMAIN",
          projectId: "PROJECT_ID",
          storageBucket: "STORAGE_BUCKET",
          messagingSenderId: "MASSAGING_SENDER_ID",
          appId: "APP_ID",
          measurementId: "MEASUREMENT_ID"
        })),
        provideAuth(() => getAuth()),
        provideStorage(() => getStorage()),
        provideFirestore(() => getFirestore()),
        provideFunctions(() => getFunctions())
      ],
      providers: [
        { provide: AuthService, useValue: AuthServiceStub }
      ]
    });
    service = TestBed.inject(ArticleService);
    authService = TestBed.inject(AuthService);
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

  fit('should get one article when getOne is called', done => {
    const docDataSpy = jest.spyOn(AngularFire, 'docData').mockReturnValue(of(Mock.article));
    const getDownloadURLSpy = jest.spyOn(Storage, 'getDownloadURL').mockReturnValue(new Promise(resolve => resolve(Mock.articleDetailed.articleUrl)));
    const getCurrentUserSpy = jest.spyOn(authService, 'getConnectedUser').mockReturnValue(of(Mock.user))

    const article$ = service.getOne('1');
    article$.pipe(first()).subscribe({
      next: article => {
        expect(docDataSpy).toHaveBeenCalledTimes(1);
        expect(getDownloadURLSpy).toHaveBeenCalledTimes(1);
        expect(getCurrentUserSpy).toHaveBeenCalledTimes(1);
        expect(article).toEqual(Mock.articleDetailed);
        done();
      }
    })
  });
});
