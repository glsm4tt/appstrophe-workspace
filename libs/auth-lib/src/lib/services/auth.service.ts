import { Injectable } from '@angular/core';

import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, UserCredential, getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    // empty
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  }

  sendPasswordResetEmail(email: string): Promise<void> {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email);
  }
}
