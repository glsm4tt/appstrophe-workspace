import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user$!: Observable<firebase.default.User | null>; 

  /**
   * Subscribe to any Auth changes to update the user observable
   */
  constructor(private auth: AngularFireAuth) {
    this.user$ = new Observable(subscriber => {
     this.auth.onAuthStateChanged(user => subscriber.next(user))
    });
  }

  /**
   * Sign in method using email and password calling the firestore {@angular/fire/compat/auth.signInWithEmailAndPassword} method
   * 
   * @param email the user email address
   * @param password the user password
   * @returns {Promise<firebase.default.auth.UserCredential>} a promise of the user credential
   */
  signInWithEmailAndPassword(email: string, password: string): Promise<firebase.default.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  /**
   * Create user method using email and password calling the firestore {@angular/fire/compat/auth.createUserWithEmailAndPassword} method
   * 
   * @param email the user email address
   * @param password the user chosen password
   * @returns {Promise<firebase.default.auth.UserCredential>} a promise of the user credential
   */
  createUserWithEmailAndPassword(email: string, password: string): Promise<firebase.default.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  /**
   * Send an email to the given user to verify the email address
   * This methods calls the firestore {@angular/fire/compat/auth.sendEmailVerification} method
   * 
   * @param user the {@angular/fire/firebase.default.User}
   * @returns {Promise<void>} a promise of void
   */
  sendEmailVerification(user: firebase.default.User): Promise<void> {
    return user.sendEmailVerification();
  }

  /**
   * A register method that first creates a user using email and password calling the {createUserWithEmailAndPassword} method
   * and then verify the user email address calling the {sendEmailVerification} method
   * 
   * @param email the user email address
   * @param password the user chosen password
   * @returns {Promise<firebase.default.auth.UserCredential>} a promise of the user credential
   */
  async register(email: string, password: string): Promise<firebase.default.auth.UserCredential> {
    const userCredential = await this.createUserWithEmailAndPassword(email, password);
    if(userCredential.user !== null) await this.sendEmailVerification(userCredential.user);
    return userCredential;
  }

  /**
   * A method that send a password recovery email calling the {@angular/fire/compat/auth.sendPasswordResetEmail} method
   * 
   * @param email the user email address
   * @returns {Promise<void>} a promise of void
   */
  sendPasswordResetEmail(email: string): Promise<void> {
    return this.auth.sendPasswordResetEmail(email);
  }
}
