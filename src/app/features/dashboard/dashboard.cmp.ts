import { Component, inject, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],

  template: `
    <div class="flex h-screen bg-slate-50 overflow-hidden font-sans antialiased">
      @if (isSidebarOpen()) {
        <aside
          [class.fixed]="isMobile()"
          [class.relative]="!isMobile()"
          class="inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-900 text-white shadow-2xl transition-all duration-300 md:w-64 md:shadow-none"
        >
          <div class="flex h-16 items-center justify-between border-b border-slate-800 px-6">
            <div class="flex items-center gap-2">
              <div class="h-8 w-8 rounded bg-blue-500"></div>
              <span class="text-xl font-bold tracking-tight text-white"
                >CRUD<span class="text-blue-400">.io</span></span
              >
            </div>
            @if (isMobile()) {
              <button
                (click)="toggleSidebar()"
                class="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            }
          </div>

          <nav class="flex-1 space-y-1 flex flex-col overflow-y-auto p-4 gap-3">
            <a
              routerLink="stats"
              (click)="closeOnMobile()"
              routerLinkActive="active-link"
              class="nav-item"
            >
              <span class="text-lg">📊</span> <span>Statistics</span>
            </a>
            <a
              routerLink="items"
              (click)="closeOnMobile()"
              routerLinkActive="active-link"
              class="nav-item"
            >
              <span class="text-lg">📦</span> <span>Managed Items</span>
            </a>

            <a
              routerLink="settings"
              (click)="closeOnMobile()"
              routerLinkActive="active-link"
              class="nav-item"
            >
              <span class="text-lg">⚙️</span> <span>Settings</span>
            </a>
          </nav>

          <div class="border-t border-slate-800 p-4">
            <button
              (click)="logout()"
              class="nav-item w-full text-slate-400 hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
            >
              <span class="text-lg">🚪</span> <span>Logout</span>
            </button>
          </div>
        </aside>
      }

      <div class="flex flex-1 flex-col min-w-0">
        <header
          class="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm md:px-8"
        >
          <div class="flex items-center gap-4">
            <button
              (click)="toggleSidebar()"
              class="rounded-lg p-2 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span class="text-2xl">☰</span>
            </button>
            <h2 class="text-lg font-semibold text-slate-800">Dashboard</h2>
          </div>

          <div class="flex items-center gap-3">
            <div class="hidden text-right md:block">
              <p class="text-sm font-bold text-slate-700 leading-none">Alexander Melara</p>
              <p class="mt-1 text-xs text-slate-500">Systems Engineer</p>
            </div>
            <div
              class="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-blue-100 shadow-sm ring-1 ring-slate-200"
            >
              <div
                class="flex h-full w-full items-center justify-center font-bold text-blue-600 text-sm"
              >
                AM
              </div>
            </div>
          </div>
        </header>

        <main class="flex-1 overflow-y-auto bg-slate-50/50 p-4 md:p-8">
          <div class="mx-auto max-w-7xl">
            <router-outlet />
          </div>
        </main>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private breakpointObserver = inject(BreakpointObserver);

  isMobile = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(map((result) => result.matches)),
    { initialValue: true },
  );

  isSidebarOpen = signal(window.innerWidth > 768);

  toggleSidebar() {
    this.isSidebarOpen.update((v) => !v);
  }

  closeOnMobile() {
    if (this.isMobile()) {
      this.isSidebarOpen.set(false);
    }
  }

  logout() {
    this.authService.logout();
  }
}
