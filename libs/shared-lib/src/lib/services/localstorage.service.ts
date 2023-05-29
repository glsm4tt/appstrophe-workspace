import { Injectable } from '@angular/core';
import { StoredData } from '../interfaces';
import '../utils/date-utils';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  /** 
   * Set a new key:value pair into the {localStorage} 
   * 
   * @param key {string} the key to retrieve the value
   * @param value {unknown} the value to store
   * @param expiration {Date} the date of the cache expiration
   * @param updateIfExist {boolean} update the value if key already exists in storage
   */
  set<T>(key: string, value: T, expiration?: Date, updateIfExist: boolean = true): void {
    const stored = localStorage.getItem(key);
    if(!updateIfExist && !stored) return;
    const expirationDate = expiration?.getTime() ?? value ? new Date().addHours(0.25).getTime() : undefined;
    const toStore: StoredData<T> = { value, expirationDate  };
    localStorage.setItem(key, JSON.stringify(toStore))
  }

  /** 
   * Get the value stored into the {localStorage} at the key {key}
   * 
   * @param key {string} the key to retrieve the stored value
   * @return value {T} the stored value
   */
  get<T>(key: string): T {
    const stored = localStorage.getItem(key);
    if(!stored) return null;
    const storedData = JSON.parse(stored) as StoredData<T>;
    if(storedData?.expirationDate < Date.now()) {
      this.set(key, null);
      return null;
    }
    return storedData.value;
  }
}
