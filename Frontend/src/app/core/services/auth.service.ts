import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';
import { LoginCredentials, AuthUser } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'j3tl.token';
  private readonly currentUserSignal = signal<AuthUser | null>(this.readUser());

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUserSignal() !== null);

  login(credentials: LoginCredentials): Observable<AuthUser> {
    // Placeholder para a integração futura com o backend Quarkus.
    const user: AuthUser = {
      email: credentials.email,
      displayName: credentials.email.split('@')[0] || 'Piloto',
    };

    return of(user).pipe(
      delay(650),
      tap((loggedUser) => {
        localStorage.setItem(this.storageKey, btoa(JSON.stringify(loggedUser)));
        this.currentUserSignal.set(loggedUser);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.currentUserSignal.set(null);
  }

  private readUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(atob(raw)) as AuthUser) : null;
    } catch {
      return null;
    }
  }
}