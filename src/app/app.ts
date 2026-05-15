import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div>
      <main>
        <router-outlet />
      </main>
    </div>
  `,
  imports: [RouterOutlet],
  providers: [
  ]
})
export class AppComponent {}
