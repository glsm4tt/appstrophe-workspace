import { Injectable, inject } from '@angular/core';
import { firstValueFrom, map, Observable, switchMap, of, tap, combineLatestWith, from, catchError, BehaviorSubject, mergeMap, distinctUntilChanged, distinctUntilKeyChanged, filter } from 'rxjs';
import { getAuth, Auth, User, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, UserCredential, deleteUser, updateEmail } from '@angular/fire/auth';
import { collection, collectionData, docData, DocumentReference, Firestore, query, CollectionReference, doc, setDoc, where } from '@angular/fire/firestore';
import { Storage, ref, getDownloadURL} from '@angular/fire/storage';
import { AppStropher } from '../entities/AppStropher';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$: BehaviorSubject<AppStropher | null | undefined> = new BehaviorSubject(undefined); 
  private _firestore = inject(Firestore);
  private _auth = inject(Auth);
  private _storage = inject(Storage);
  private _userSettingsChanged = new BehaviorSubject<void>(null);

  /**
   * Subscribe to any Auth changes to update the user observable
   */
  constructor() {
    new Observable<User>(subscriber => {
      this._auth.onIdTokenChanged(user => {
        subscriber.next(user)
      })
    }).pipe(
      combineLatestWith(this._userSettingsChanged),
      switchMap(([user]) => user ? this.getMe(user as User) : of(null)),
    ).subscribe(user => this.user$.next(user))
  }

  /**
   * Get the given user infos as an {Observable<AppStropher>}.
   * Note: This method is made to get called with the current connected {@angular/fire/auth.User}
   * 
   * @param user a {@angular/fire/auth.User}
   * @returns {Observable<AppStropher>}
   */
  private getMe(user: User): Observable<AppStropher> {
    const userDoc: DocumentReference<AppStropher> = doc(this._firestore, `users/${user.uid}`) as DocumentReference<AppStropher>;
    const userPictureUrlRef = ref(this._storage, `users/${user.uid}`)
    const userPictureUrl$ = from(getDownloadURL(userPictureUrlRef)).pipe(catchError(err => of(null)))

    return docData(userDoc, {'idField': 'id'}).pipe(
      combineLatestWith(userPictureUrl$),
      map(([appstropher, url]) => ({
        ...appstropher,
        ...user,
        photoURL: appstropher?.photoURL ?? url ?? 'assets/img/empty_user.png'
      }))
    );
  }

  /**
   * Cheaty hack to make the {@angular/fire/storage} reactive.
   * Every time we need to replay the getMe method, we juste have to 
   * next a new empty value in the _userSettingsChanged {rxjs.BehaviorSubject}
   */
  askForUserUpdate(): void {
    this._userSettingsChanged.next();
  }

  /**
   * Get an {Observable} of the current connected user
   * The inner value can be {null} or a {AppStropher}
   * 
   * @returns {null} or a {AppStropher}
   */
  getConnectedUser(): Observable<AppStropher | null> {
    return this.user$.asObservable().pipe(filter(user => user !== undefined));
  }

  /**
   * Sign in method using email and password calling the firestore {@angular/fire/auth.signInWithEmailAndPassword} method
   * The {@angular/fire/auth.Auth} can be passed as argument to avoid a {@angular/fire/auth.getAuth} call
   * 
   * @param email the user email address
   * @param password the user password
   * @param auth @optional the {@angular/fire/auth.Auth}
   * @returns {Promise<UserCredential>} a promise of the user credential
   */
   signInWithEmailAndPassword(email: string, password: string, auth?: Auth): Promise<UserCredential> {
    const _auth = auth ?? getAuth();
    return signInWithEmailAndPassword(_auth, email, password);
  }

  /**
   * Create user method using email and password calling the firestore {@angular/fire/auth.createUserWithEmailAndPassword} method
   * The {@angular/fire/auth.Auth} can be passed as argument to avoid a {@angular/fire/auth.getAuth} call
   * 
   * @param email the user email address
   * @param password the user chosen password
   * @param auth @optional the {@angular/fire/auth.Auth}
   * @returns {Promise<UserCredential>} a promise of the user credential
   */
  createUserWithEmailAndPassword(email: string, password: string, auth?: Auth): Promise<UserCredential> {
    const _auth = auth ?? getAuth();
    return createUserWithEmailAndPassword(_auth, email, password);
  }

  /**
   * Send an email to the given user to verify the email address
   * This methods calls the firestore {@angular/fire/auth.sendEmailVerification} method
   * 
   * @param user the {@angular/fire/auth.User}
   * @returns {Promise<void>} a promise of void
   */
  sendEmailVerification(user: User): Promise<void> {
    return sendEmailVerification(user);
  }

  /**
   * A register method that first creates a user using email and password calling the {createUserWithEmailAndPassword} method
   * and then verify the user email address calling the {sendEmailVerification} method
   * 
   * @param alias the user alias (unique)
   * @param email the user email address
   * @param password the user chosen password
   * @returns {Promise<UserCredential>} a promise of the user credential
   */
  async register(alias: string, email: string, password: string): Promise<UserCredential> {
      const auth = getAuth();
      // Create the user in forebase/auth
      const userCredential: UserCredential = await this.createUserWithEmailAndPassword(email, password, auth);
      const user = userCredential.user;
      // Send the email confirmation link to verify user email address
      await this.sendEmailVerification(user);
      // TODO: handle rollback if alias creation fails
      await this.createAppStropher(user, `@${alias}`);
      return userCredential;
  }

  /**
   * Creates a new user in the firestore database
   * Note: To perform this request, the user as to be connected with firebase/auth
   * 
   * @param user the {@angular/fire/auth.User} 
   * @param alias some unique {string}
   * @returns {Promise<void>} a promise of void 
   */
  createAppStropher(user: User, alias: string): Promise<void> {
    const userDoc: DocumentReference = doc(this._firestore, `users/${user.uid}`) as DocumentReference;
    return setDoc(userDoc, { alias });
  }

  /**
   * A method that send a password recovery email calling the {@angular/fire/auth.sendPasswordResetEmail} method
   * The {@angular/fire/auth.Auth} can be passed as argument to avoid a {@angular/fire/auth.getAuth} call
   * 
   * @param email the user email address
   * @param auth @optional the {@angular/fire/auth.Auth}
   * @returns {Promise<void>} a promise of void
   */
  sendPasswordResetEmail(email: string, auth?: Auth): Promise<void> {
    const _auth = auth ?? getAuth();
    return sendPasswordResetEmail(_auth, email);
  }

  /**
   * Check if the user alias already exists in database
   * 
   * @param alias {string} the alias to test
   * @returns {boolean} whether the alias already exists or not
   */
  doesAliasAlreadyExists(alias: string): Promise<boolean> {
    const usersCollection: CollectionReference<AppStropher> = collection(this._firestore, `users`) as CollectionReference<AppStropher>;
    const usersQuery = query(usersCollection, where('alias', '==', alias))
    return firstValueFrom(collectionData(usersQuery).pipe(
      map(users => !!users.length)
    ))
  }

  /**
   * Delete the given account
   * This methods calls the firestore {@angular/fire/auth.sendEmailVerification} method
   * 
   * @returns {Promise<void>} 
   */
  deleteAccount(): Promise<void> {
    const user = this._auth.currentUser;
    return deleteUser(user);
  }

  /**
   * Change the user email address
   * This methods calls the firestore {@angular/fire/auth.updateEmail} method
   * 
   * @param email {string} the new wanted {@angular/fire/auth.User.email}
   * @returns {Promise<void>} 
   */
  changeEmail(email: string): Promise<void> {
    const user = this._auth.currentUser;
    return updateEmail(user, email);
  }

  /**
   * Get the terms and conditions PDF file
   * 
   * @returns {Promise<string>} 
   */
  getTermsAndConditions(): Promise<string> {
    const termsAndConditionsUrlRef = ref(this._storage, `globals/terms-and-conditions.pdf`)
    return getDownloadURL(termsAndConditionsUrlRef);
  }
}