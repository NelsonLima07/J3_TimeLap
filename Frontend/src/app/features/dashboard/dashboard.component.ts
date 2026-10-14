import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../core/services/auth.service';
import { PilotoService } from '../../core/services/piloto.service';
import { Piloto } from '../../core/models/piloto.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatTooltipModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly pilotoService = inject(PilotoService);

  readonly user = this.authService.currentUser;
  readonly displayedColumns = ['nome', 'apelido', 'numero'];
  pilotos$: Observable<Piloto[]> = this.pilotoService.list();
  readonly now = new Date();

  ngOnInit(): void {
    this.pilotos$ = this.pilotoService.list();
  }

  logout(): void {
    this.authService.logout();
  }
}