import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PilotosComponent } from './features/pilotos/pilotos.component';
import { PlaceholderPageComponent } from './features/placeholder/placeholder-page.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'pilotos', component: PilotosComponent },
      { path: 'torneios', component: PlaceholderPageComponent, data: { title: 'Torneios' } },
      { path: 'corridas', component: PlaceholderPageComponent, data: { title: 'Corridas' } },
      { path: 'treino', component: PlaceholderPageComponent, data: { title: 'Treino' } },
      { path: 'agendamento', component: PlaceholderPageComponent, data: { title: 'Agendamento' } },
      { path: 'financeiro', component: PlaceholderPageComponent, data: { title: 'Financeiro' } },
      { path: 'config', component: PlaceholderPageComponent, data: { title: 'Configurações' } },
    ],
  },
  { path: '**', redirectTo: '' },
];