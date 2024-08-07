// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class StorageService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  isSessionStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.sessionStorage;
  }

  getSessionItem(key: string): string | null {
    if (this.isSessionStorageAvailable()) {
      return sessionStorage.getItem(key);
    }
    console.error('Session storage is not available.');
    return null;
  }

  setSessionItem(key: string, value: string): void {
    if (this.isSessionStorageAvailable()) {
      sessionStorage.setItem(key, value);
    } else {
      console.error('Session storage is not available.');
    }
  }

  removeSessionItem(key: string): void {
    if (this.isSessionStorageAvailable()) {
      sessionStorage.removeItem(key);
    } else {
      console.error('Session storage is not available.');
    }
  }

  clearSession(): void {
    if (this.isSessionStorageAvailable()) {
      sessionStorage.clear();
    } else {
      console.error('Session storage is not available.');
    }
  }
}


