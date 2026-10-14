import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-placeholder-page',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  template: `
    <mat-card class="placeholder-card">
      <mat-card-content>
        <mat-icon>construction</mat-icon>
        <div>
          <h1>{{ title }}</h1>
          <p>Esta seção está em construção. Em breve terá gestão completa por aqui.</p>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .placeholder-card mat-card-content {
        display: flex;
        gap: 1rem;
        align-items: center;
        padding: 2rem;
      }

      mat-icon {
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
        color: var(--mat-sys-primary);
      }

      h1 {
        margin: 0 0 0.5rem;
        font-family: 'Orbitron', sans-serif;
        text-transform: uppercase;
      }

      p {
        margin: 0;
        color: var(--mat-sys-on-surface-variant);
      }
    `,
  ],
})
export class PlaceholderPageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly title = this.route.snapshot.data['title'] ?? 'Em construção';
}