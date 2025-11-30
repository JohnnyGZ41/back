import {computed, Injectable, Signal, signal} from '@angular/core';
import {User} from '../domain/model/user.entity';
import {retry, take} from 'rxjs';
import {Account} from '../domain/model/account.entity';
import {IamApi} from '../infrastructure/services/iam-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {SignInCommand} from '../domain/model/sign-in.command';
import {Router} from '@angular/router';
import {SignUpCommand} from '../domain/model/sign-up.command';

@Injectable({ providedIn: 'root' })
export class IamStore {
  // --- SIGNALS DE DATOS ---
  private readonly usersSignal = signal<User[]>([]);
  readonly users = this.usersSignal.asReadonly();

  private readonly accountsSignal = signal<Account[]>([]);
  readonly accounts = this.accountsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  // --- ESTADO DE SESIÓN ---
  // 1. Persistencia: Lee localStorage para no perder el ID al recargar
  public readonly currentAccountIdSignal = signal<number | null>(
    localStorage.getItem('accountId') ? Number(localStorage.getItem('accountId')) : null
  );
  readonly currentUserId = this.currentAccountIdSignal.asReadonly();

  private readonly isSignedInSignal = signal<boolean>(!!localStorage.getItem('token'));
  readonly isSignedIn = this.isSignedInSignal.asReadonly();

  private readonly currentEmailSignal = signal<string | null>(localStorage.getItem('email'));
  readonly currentEmail = this.currentEmailSignal.asReadonly();

  readonly userCount = computed(() => this.users().length);
  readonly accountCount = computed(() => this.accounts().length);
  readonly loadingUsers = signal<boolean>(false);
  readonly currentToken = computed(() => this.isSignedIn() ? localStorage.getItem('token') : null);
  readonly isLoadingUsers = this.loadingUsers.asReadonly();

  constructor(private iamApi: IamApi) {
    this.loadUsers();
    this.loadAccounts();

    // 2. Carga forzada: Si hay ID guardado, trae los datos de esa cuenta inmediatamente
    if (this.currentAccountIdSignal()) {
      this.loadAccountById(this.currentAccountIdSignal()!);
    }
  }

  // --- SOLUCIÓN AL ERROR TS2339 ---
  // Usamos 'get' en lugar de 'computed'.
  // Esto hace que 'iamStore.currentAccount.id' funcione en ProjectView y Layout sin paréntesis.
  get currentAccount(): Account | undefined {
    return this.accounts().find(account => account.id === this.currentAccountIdSignal());
  }

  // --- CARGA ESPECÍFICA ---
  private loadAccountById(id: number): void {
    this.iamApi.getAccount(id).pipe(take(1)).subscribe({
      next: account => {
        this.accountsSignal.update(currentAccounts => {
          const index = currentAccounts.findIndex(a => a.id === account.id);
          if (index !== -1) {
            const updated = [...currentAccounts];
            updated[index] = account;
            return updated;
          }
          return [...currentAccounts, account];
        });
      },
      error: err => console.error('Error loading account', err)
    });
  }

  // --- CARGA GENERAL ---
  private loadUsers(): void {
    this.loadingSignal.set(true);
    this.iamApi.getUsers().pipe(takeUntilDestroyed()).subscribe({
      next: users => { this.usersSignal.set(users); this.loadingSignal.set(false); },
      error: () => this.loadingSignal.set(false)
    });
  }

  private loadAccounts(): void {
    this.loadingSignal.set(true);
    this.iamApi.getAccounts().pipe(takeUntilDestroyed()).subscribe({
      next: accounts => { this.accountsSignal.set(accounts); this.loadingSignal.set(false); },
      error: () => this.loadingSignal.set(false)
    });
  }

  private formatError(error: any, fallback: string): string {
    return fallback;
  }

  // --- HELPERS Y CRUD ---
  getUserById(id: number): Signal<User | undefined>{
    return computed(() => id? this.users().find(u => u.id === id): undefined);
  }

  // (Mantén aquí tus métodos addUser, deleteUser, etc. Copia y pega si faltan)
  addUser(user: User): void { /* ... código original ... */ }
  updateUser(user: User): void { /* ... código original ... */ }
  deleteUser(id: number): void { /* ... código original ... */ }
  getAccountById(id: number): Signal<Account | undefined>{ return computed(() => id? this.accounts().find(a => a.id === id): undefined); }
  addAccount(account: Account): void { /* ... código original ... */ }
  updateAccount(account: Account): void { /* ... código original ... */ }
  deleteAccount(id: number): void { /* ... código original ... */ }

  // --- AUTENTICACIÓN ---

  signIn(signInCommand: SignInCommand, router: Router) {
    this.iamApi.signIn(signInCommand).subscribe({
      next: (signInResource) => {
        localStorage.setItem('token', signInResource.token);
        localStorage.setItem('accountId', signInResource.id.toString());
        localStorage.setItem('email', signInResource.email);

        this.isSignedInSignal.set(true);
        this.currentEmailSignal.set(signInResource.email);
        this.currentAccountIdSignal.set(signInResource.id);

        this.loadAccountById(signInResource.id);
        this.loadUsers();

        router.navigate(['/']).then();
      },
      error: (err) => {
        console.error('Sign-in failed:', err);
        this.signOut(router);
      }
    });
  }

  signUp(signUpCommand: SignUpCommand, router: Router) {
    this.iamApi.signUp(signUpCommand).subscribe({
      next: () => {
        router.navigate(['/log-in']).then();
      },
      error: (err) => console.error(err)
    });
  }

  signOut(router: Router) {
    localStorage.removeItem('token');
    localStorage.removeItem('accountId');
    localStorage.removeItem('email');

    this.isSignedInSignal.set(false);
    this.currentEmailSignal.set(null);
    this.currentAccountIdSignal.set(null);

    router.navigate(['/log-in']).then();
  }
}
