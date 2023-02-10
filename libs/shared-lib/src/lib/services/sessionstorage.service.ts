import { Injectable } from '@angular/core';
import { StoredData } from '../interfaces';
import '../utils/date-utils';

@Injectable({
  providedIn: 'root'
})
export class SessionstorageService {

  /** 
   * Set a new key:value pair into the {sessionStorage} 
   * 
   * @param key {string} the key to retrieve the value
   * @param value {unknown} the value to store
   * @param expiration {Date} the date of the cache expiration
   */
  set<T>(key: string, value: T, expiration?: Date): void {
    const expirationDate = expiration?.getTime() ?? value ? new Date().addHours(0.25).getTime() : undefined;
    const toStore: StoredData<T> = { value, expirationDate  };
    sessionStorage.setItem(key, JSON.stringify(toStore))
  }

  /** 
   * Get the value stored into the {sessionStorage} at the key {key}
   * 
   * @param key {string} the key to retrieve the stored value
   * @return value {T} the stored value
   */
  get<T>(key: string): T {
    const stored = sessionStorage.getItem(key);
    if(!stored) return null;
    const storedData = JSON.parse(stored) as StoredData<T>;
    if(storedData?.expirationDate < Date.now()) {
      this.set(key, null);
      return null;
    }
    return storedData.value;
  }
}
