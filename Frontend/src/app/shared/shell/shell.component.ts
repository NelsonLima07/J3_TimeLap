import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../core/services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly user = this.authService.currentUser;

  readonly menuItems: MenuItem[] = [
    { label: 'Home', icon: 'dashboard', route: '/dashboard' },
    { label: 'Pilotos', icon: 'person', route: '/pilotos' },
    { label: 'Torneios', icon: 'emoji_events', route: '/torneios' },
    { label: 'Corridas', icon: 'flag', route: '/corridas' },
    { label: 'Treino', icon: 'speed', route: '/treino' },
    { label: 'Agendamento', icon: 'event', route: '/agendamento' },
    { label: 'Financeiro', icon: 'payments', route: '/financeiro' },
    { label: 'Configurações', icon: 'settings', route: '/config' },
  ];

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}