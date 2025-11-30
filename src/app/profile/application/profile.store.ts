import {computed, Injectable, Signal, signal} from '@angular/core';
import {Profile} from '../domain/model/profile.entity';
import {Portfolio} from '../domain/model/portfolio.entity';
import {GroupProject} from '../domain/model/group-project.entity';
import {ProfileApi} from '../infrastructure/services/profile-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileStore {
  private readonly profilesSignal = signal<Profile[]>([]);
  readonly profiles = this.profilesSignal.asReadonly();

  private readonly portfoliosSignal = signal<Portfolio[]>([]);
  readonly portfolios = this.portfoliosSignal.asReadonly();

  private readonly groupProjectsSignal = signal<GroupProject[]>([]);
  readonly groupProjects = this.groupProjectsSignal.asReadonly();

  readonly profileCount = computed(() => this.profiles().length);
  readonly portfolioCount = computed(() => this.portfolios().length);
  readonly groupProjectCount = computed(() => this.groupProjects().length);

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  private _currentProfile: Profile | undefined = undefined;

  constructor(private profileApi: ProfileApi) {
    this.loadProfiles();
    this.loadPortfolios();
    this.loadGroupProjects();
  }

  get currentProfile(): Profile | undefined {
    return this._currentProfile;
  }
  set currentProfile(value: Profile){
    this._currentProfile = value;
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? '${fallback}: Not found' : error.message;
    }
    return fallback;
  }

  private loadProfiles(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.profileApi.getProfiles().pipe(takeUntilDestroyed()).subscribe({
      next: profiles => {
        console.log(profiles);
        this.profilesSignal.set(profiles);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load profiles'));
        this.loadingSignal.set(false);
      }
    });
  }

  private loadPortfolios(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.profileApi.getPortfolios().pipe(takeUntilDestroyed()).subscribe({
      next: portfolios => {
        console.log(portfolios);
        this.portfoliosSignal.set(portfolios);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load portfolios'));
        this.loadingSignal.set(false);
      }
    });
  }

  private loadGroupProjects(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.profileApi.getGroupProjects().pipe(takeUntilDestroyed()).subscribe({
      next: groupProjects => {
        console.log(groupProjects);
        this.groupProjectsSignal.set(groupProjects);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load group projects'));
        this.loadingSignal.set(false);
      }
    });
  }

  getProfileById(id: number): Signal<Profile | undefined>{
    return computed(() => id? this.profiles().find(p => p.id === id): undefined);
  }

  addProfile(profile: Profile): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.profileApi.createProfile(profile).pipe(retry(2)).subscribe({
      next: createdProfile => {
        this.profilesSignal.update(profiles => [...profiles, createdProfile]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create profile'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateProfile(updatedProfile: Profile): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.profileApi.updateProfile(updatedProfile).pipe(retry(2)).subscribe({
      next: profile => {
        this.profilesSignal.update(profiles => profiles.map(p => p.id === profile.id ? profile : p));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update profile'));
        this.loadingSignal.set(false);
      }
    });
  }

  deleteProfile(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.profileApi.deleteProfile(id).pipe(retry(2)).subscribe({
      next: () => {
        this.profilesSignal.update(profiles => profiles.filter((p => p.id !== id)));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete profile'));
        this.loadingSignal.set(false);
      }
    });
  }


  getPortfolioById(id: number): Signal<Portfolio | undefined>{
    return computed(() => id? this.portfolios().find(p => p.id === id): undefined);
  }

  addPortfolio(portfolio: Portfolio): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.profileApi.createPortfolio(portfolio).pipe(retry(2)).subscribe({
      next: createdPortfolio => {
        this.portfoliosSignal.update(portfolios => [...portfolios, createdPortfolio]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create portfolio'));
        this.loadingSignal.set(false);
      }
    });
  }

  updatePortfolio(updatedPortfolio: Portfolio): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.profileApi.updatePortfolio(updatedPortfolio).pipe(retry(2)).subscribe({
      next: portfolio => {
        this.portfoliosSignal.update(portfolios => portfolios.map(p => p.id === portfolio.id ? portfolio : p));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update portfolio'));
        this.loadingSignal.set(false);
      }
    });
  }

  deletePortfolio(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.profileApi.deletePortfolio(id).pipe(retry(2)).subscribe({
      next: () => {
        this.portfoliosSignal.update(portfolios => portfolios.filter((p => p.id !== id)));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete portfolio'));
        this.loadingSignal.set(false);
      }
    });
  }


  getGroupProjectById(id: number): Signal<GroupProject | undefined>{
    return computed(() => id? this.groupProjects().find(g => g.id === id): undefined);
  }

  addGroupProject(groupProject: GroupProject): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.profileApi.createGroupProject(groupProject).pipe(retry(2)).subscribe({
      next: createdGroupProject => {
        this.groupProjectsSignal.update(groupProjects => [...groupProjects, createdGroupProject]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create group project'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateGroupProject(updatedGroupProject: GroupProject): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.profileApi.updateGroupProject(updatedGroupProject).pipe(retry(2)).subscribe({
      next: groupProject => {
        this.groupProjectsSignal.update(groupProjects => groupProjects.map(g => g.id === groupProject.id ? groupProject : g));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update group project'));
        this.loadingSignal.set(false);
      }
    });
  }

  deleteGroupProject(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.profileApi.deleteGroupProject(id).pipe(retry(2)).subscribe({
      next: () => {
        this.groupProjectsSignal.update(groupProjects => groupProjects.filter((g => g.id !== id)));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete group project'));
        this.loadingSignal.set(false);
      }
    });
  }


}
