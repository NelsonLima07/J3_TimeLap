import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { Piloto } from '../../core/models/piloto.model';
import { PilotoService } from '../../core/services/piloto.service';

@Component({
  selector: 'app-pilotos',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  templateUrl: './pilotos.component.html',
  styleUrl: './pilotos.component.scss',
})
export class PilotosComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly pilotoService = inject(PilotoService);
  private readonly snackBar = inject(MatSnackBar);

  readonly displayedColumns = ['numero', 'nome', 'apelido', 'dataNascimento', 'acoes'];

  readonly pilotos = signal<Piloto[]>([]);
  readonly loading = signal(false);
  readonly formVisible = signal(false);
  readonly editingId = signal<number | null>(null);
  readonly deleteCandidate = signal<number | null>(null);
  readonly saving = signal(false);

  readonly form = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    apelido: [''],
    numero: [null as number | null],
    dataNascimento: [''],
  });

  ngOnInit(): void {
    this.loadPilotos();
  }

  loadPilotos(): void {
    this.loading.set(true);
    this.pilotoService.list().subscribe({
      next: (pilotos) => {
        this.pilotos.set(pilotos);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open('Não foi possível carregar os pilotos.', 'Fechar', { duration: 3000 });
      },
    });
  }

  openCreateForm(): void {
    this.editingId.set(null);
    this.form.reset({ nome: '', apelido: '', numero: null, dataNascimento: '' });
    this.formVisible.set(true);
  }

  openEditForm(piloto: Piloto): void {
    this.editingId.set(piloto.id ?? null);
    this.form.patchValue({
      nome: piloto.nome,
      apelido: piloto.apelido ?? '',
      numero: piloto.numero ?? null,
      dataNascimento: piloto.dataNascimento ?? '',
    });
    this.formVisible.set(true);
  }

  cancelForm(): void {
    this.formVisible.set(false);
    this.editingId.set(null);
    this.form.reset({ nome: '', apelido: '', numero: null, dataNascimento: '' });
  }

  submitForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const payload: Partial<Piloto> = {
      nome: value.nome ?? '',
      apelido: value.apelido || null,
      numero: value.numero,
      dataNascimento: value.dataNascimento || null,
    };

    this.saving.set(true);
    const request$ = this.editingId()
      ? this.pilotoService.update(this.editingId()!, payload)
      : this.pilotoService.create(payload);

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.cancelForm();
        this.loadPilotos();
        this.snackBar.open('Piloto salvo com sucesso.', 'Fechar', { duration: 2500 });
      },
      error: () => {
        this.saving.set(false);
        this.snackBar.open('Erro ao salvar piloto.', 'Fechar', { duration: 3000 });
      },
    });
  }

  askDelete(id?: number): void {
    if (id == null) return;
    this.deleteCandidate.set(id);
  }

  cancelDelete(): void {
    this.deleteCandidate.set(null);
  }

  confirmDelete(): void {
    const id = this.deleteCandidate();
    if (id == null) return;

    this.pilotoService.delete(id).subscribe({
      next: () => {
        this.deleteCandidate.set(null);
        this.loadPilotos();
        this.snackBar.open('Piloto desativado.', 'Fechar', { duration: 2500 });
      },
      error: () => {
        this.snackBar.open('Erro ao desativar piloto.', 'Fechar', { duration: 3000 });
      },
    });
  }
}