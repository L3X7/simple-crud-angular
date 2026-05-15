import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: ` <div class="flex min-h-screen items-center justify-center bg-slate-50 px-4">
    <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
      <h2 class="text-center text-3xl font-bold">Welcome</h2>

      <form class="mt-8" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="space-y-4">
          <div>
            <label for="email">Email</label>
            <input
              formControlName="email"
              class="w-full rounded-lg border border-gray-300 p-3"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
            @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
              <small class="text-red-500 mt-1 block">Please enter a valid email address.</small>
            }
          </div>
          <div>
            <label for="password">Password</label>
            <input
              formControlName="password"
              class="w-full rounded-lg border border-gray-300 p-3"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
            />
            @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
              <small class="text-red-500 mt-1 block"
                >Min lenght 6 characters for the password</small
              >
            }
          </div>

          <button
            class="w-full rounded-lg bg-blue-600 p-3 text-white cursor-pointer"
            type="submit"
            [disabled]="loginForm.invalid || loading()"
          >
            {{ loading() ? 'Signing in...' : 'Sign In' }}
          </button>

          <div class="text-center text-blue-700">
            <a routerLink="/auth/register">Don't have an account?</a>
          </div>
        </div>
      </form>
    </div>
  </div>`,
})
export class LoginComponent {
  private autService = inject(AuthService);
  private fb = inject(FormBuilder);
  loading = signal(false);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading.set(true);
    this.autService.login(this.loginForm.getRawValue()).subscribe({
      next: () => this.loading.set(false),
      error: () => {
        (alert('Invalid credentials'), this.loading.set(false));
      },
    });
  }
}
