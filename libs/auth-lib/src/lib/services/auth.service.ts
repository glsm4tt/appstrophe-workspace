import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getAuth, Auth, User, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user$!: Observable<User | null>; 

  /**
   * Subscribe to any Auth changes to update the user observable
   */
  constructor(private auth: Auth) {
    this.user$ = new Observable(subscriber => {
     this.auth.onAuthStateChanged(user => subscriber.next(user))
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
   * @param email the user email address
   * @param password the user chosen password
   * @returns {Promise<UserCredential>} a promise of the user credential
   */
  async register(email: string, password: string): Promise<UserCredential> {
    const auth = getAuth();
    const userCredential = await this.createUserWithEmailAndPassword(email, password, auth);
    await this.sendEmailVerification(userCredential.user);
    return userCredential;
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
}