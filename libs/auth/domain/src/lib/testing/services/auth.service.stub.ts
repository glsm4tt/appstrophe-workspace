import { User, Auth, UserCredential } from "@angular/fire/auth";
import { Observable, of } from "rxjs";

const userCredential: UserCredential = {
  user: undefined,
  providerId: "",
  operationType: "link"
};

export const AuthServiceStub = {
  getConnectedUser: () => of(null),
  signInWithEmailAndPassword: (email: string, password: string, auth?: Auth): Promise<UserCredential> => new Promise(resolve => resolve(userCredential)),
  createUserWithEmailAndPassword: (email: string, password: string, auth?: Auth): Promise<UserCredential> => new Promise(resolve => resolve(userCredential)),
  sendEmailVerification: (user: User): Promise<void> => new Promise(resolve => resolve(null)),
  register: (email: string, password: string): Promise<UserCredential> => new Promise(resolve => resolve(userCredential)),
  sendPasswordResetEmail: (email: string, auth?: Auth): Promise<void>  => new Promise(resolve => resolve(null))
}
  