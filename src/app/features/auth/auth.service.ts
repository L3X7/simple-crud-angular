import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API_URL = 'http://localhost:3000';

  isAuthenticate = signal<boolean>(!!localStorage.getItem('token'));

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        this.isAuthenticate.set(true);
        this.router.navigate(['/dashboard']);
      }),
    );
  }

  register(credentials: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
  }) {
    return this.http.post<void>(`${this.API_URL}/auth/register`, credentials).pipe(
      tap((res) => {
        this.router.navigate(['/auth/login']);
      }),
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticate.set(false);
    this.router.navigate(['/login']);
  }
}
