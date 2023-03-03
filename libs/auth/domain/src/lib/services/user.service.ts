import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { AppStropher } from '../entities/AppStropher';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _storage = inject(Storage)
  private _authService = inject(AuthService)

  constructor() {
    // empty
  }

  async uploadProfilePicture(file: File, user: AppStropher): Promise<void> {
    const storageRef = ref(this._storage, `users/${user.uid}`);
    await uploadBytes(storageRef, file);
    this._authService.askForUserUpdate();
  }
}