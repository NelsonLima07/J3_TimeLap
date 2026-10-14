import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Piloto } from '../models/piloto.model';

@Injectable({ providedIn: 'root' })
export class PilotoService {
  private readonly mockPilotos: Piloto[] = [
    { id: 1, nome: 'Ayrton Senna', apelido: 'Senna', numero: 1 },
    { id: 2, nome: 'Michael Schumacher', apelido: 'Schumi', numero: 3 },
    { id: 3, nome: 'Lewis Hamilton', apelido: 'Lewis', numero: 44 },
  ];

  list(): Observable<Piloto[]> {
    return of(this.mockPilotos);
  }
}