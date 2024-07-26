import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  roles: Array<String> = [];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  public isLogged(): boolean {
    return this.getToken() !== null;
  }

  public getUsername(): string {
    if (!this.isLogged()) {
      return "";
    }
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      return values.sub;
    }
    return "";
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem(TOKEN_KEY);
    }
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  getUserName(): string {
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      return values.sub;
    }
    return '';
  }

  getRole(): string {
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const payloadDecoded = atob(payload);
      const values = JSON.parse(payloadDecoded);
      return values.role || '';
    }
    return '';
  }
}