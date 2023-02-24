import { Injectable, inject } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { getAuth, Auth, User, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, UserCredential, UserInfo } from '@angular/fire/auth';
import { docData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { AppStropher } from '../entities/AppStropher';
import { doc, setDoc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$!: Observable<User | null>; 
  private _firestore = inject(Firestore);
  private _auth = inject(Auth);

  /**
   * Subscribe to any Auth changes to update the user observable
   */
  constructor() {
    this.user$ = new Observable(subscriber => {
      this._auth.onAuthStateChanged(user => subscriber.next(user))
    });
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
      await this.createAppStropher(user, alias);
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
    const userDoc: DocumentReference<AppStropher> = doc(this._firestore, `users/@${alias}`) as DocumentReference<AppStropher>;
    return setDoc(userDoc, {uid: user.uid});
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

  doesAliasAlreadyExists(alias: string): Promise<boolean> {
    const userDoc: DocumentReference<AppStropher> = doc(this._firestore, `users/${alias}`) as DocumentReference<AppStropher>;
    return firstValueFrom(docData(userDoc, {idField: 'alias'}).pipe(
      map(user => !!user)
    ))
  }
}