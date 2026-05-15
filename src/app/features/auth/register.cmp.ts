import { Component, inject, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomValidators } from '../../shared/validators/custom.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-100">
        <h2 class="text-center text-3xl font-bold">Register</h2>

        <form class="mt-8" [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="space-y-4">
            <div>
              <label for="name">Name</label>
              <input
                formControlName="name"
                class="w-full rounded-lg border border-gray-300 p-3"
                type="name"
                name="name"
                id="name"
                placeholder="name"
              />
              @if (registerForm.get('name')?.invalid && registerForm.get('name')?.touched) {
                <small class="text-red-500 mt-1 block">Please enter a valid name.</small>
              }
            </div>
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
              @if (registerForm.get('email')?.invalid && registerForm.get('email')?.touched) {
                <small class="text-red-500 mt-1 block">Please enter a valid email address.</small>
              }
            </div>
            <div>
              <label for="phone">Phone</label>
              <input
                formControlName="phone"
                class="w-full rounded-lg border border-gray-300 p-3"
                type="text"
                name="phone"
                id="phone"
                placeholder="phone"
              />
              @if (registerForm.get('phone')?.invalid && registerForm.get('phone')?.touched) {
                <small class="text-red-500 mt-1 block">Please enter a valid phone.</small>
              }
            </div>
            <div>
              <label for="role">Role</label>
              <input
                formControlName="role"
                class="w-full rounded-lg border border-gray-300 p-3"
                type="text"
                name="role"
                id="role"
                placeholder="role"
              />
              @if (registerForm.get('role')?.invalid && registerForm.get('role')?.touched) {
                <small class="text-red-500 mt-1 block">Please enter a valid role.</small>
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
              @if (registerForm.get('password')?.invalid && registerForm.get('password')?.touched) {
                <small class="text-red-500 mt-1 block"
                  >Min lenght 6 characters for the password</small
                >
              }
            </div>
            <div>
              <label for="confirmPassword">Confirm Password</label>
              <input
                formControlName="confirmPassword"
                class="w-full rounded-lg border border-gray-300 p-3"
                type="confirmPassword"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
              />
              @if (registerForm.get('confirmPassword')?.touched) {
                @if (registerForm.get('confirmPassword')?.hasError('required')) {
                  <small class="text-red-500 block"
                    >Please confirm your password.</small
                  >
                }
                @if (registerForm.get('confirmPassword')?.hasError('minlength')) {
                  <small class="text-red-500 block"
                    >Minimum 6 characters required.</small
                  >
                }
                @if (registerForm.get('confirmPassword')?.hasError('mismatch')) {
                  <small class="text-red-500 block">Passwords do not match.</small>
                }
              }
            </div>

            <button
              class="w-full rounded-lg bg-blue-600 p-3 text-white cursor-pointer"
              type="submit"
              [disabled]="registerForm.invalid || loading()"
            >
              {{ loading() ? 'Signing up...' : 'Sign Up' }}
            </button>

            <div class="text-center text-blue-700">
              <a routerLink="/auth/login">Do you already have an account?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  loading = signal(false);

  registerForm = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['', [Validators.required]],
    },
    {
      validators: [CustomValidators.match('password', 'confirmPassword')],
    },
  );

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.loading.set(true);
    const { confirmPassword, ...requestData } = this.registerForm.getRawValue();
    this.authService.register(requestData).subscribe({
      next: () => this.loading.set(false),
      error: () => {
        alert('Error in register');
        this.loading.set(false);
      },
    });
  }
}
