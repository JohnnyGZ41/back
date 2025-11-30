import {computed, Injectable, Signal, signal} from '@angular/core';
import {Publication} from '../domain/model/publication.entity';
import {Answer} from '../domain/model/answer.entity';
import {CommunityApi} from '../infrastructure/services/community-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommunityStore {

  private readonly publicationsSignal = signal<Publication[]>([]);
  readonly publications = this.publicationsSignal.asReadonly();

  private readonly answersSignal = signal<Answer[]>([]);
  readonly answers = this.answersSignal.asReadonly();

  readonly publicationCount = computed(() => this.publications().length);
  readonly answerCount = computed(() => this.answers().length);

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  private _currentPublication: Publication | undefined = undefined;

  constructor(private communityApi: CommunityApi ) {
    this.loadPublications();
    this.loadAnswers();

    console.log("LOS JUEGOS SON")
    console.log("hjhkjh")
  }

  get currentPublication(): Publication | undefined {
    return this._currentPublication;
  }
  set currentPublication(value: Publication) {
    this._currentPublication = value;
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? '${fallback}: Not found' : error.message;
    }
    return fallback;
  }

  private loadPublications(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.communityApi.getPublications().pipe(takeUntilDestroyed()).subscribe({
      next: publications => {
        console.log(publications);
        this.publicationsSignal.set(publications);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load publications'));
        this.loadingSignal.set(false);
      }
    });
  }

  private loadAnswers(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.communityApi.getAnswers().pipe(takeUntilDestroyed()).subscribe({
      next: answers => {
        console.log(answers);
        this.answersSignal.set(answers);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load answers'));
        this.loadingSignal.set(false);
      }
    });
  }


  getPublicationById(id: number): Signal<Publication | undefined>{
    return computed(() => id? this.publications().find(p => p.id === id): undefined);
  }

  addPublication(publication: Publication): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.communityApi.createPublication(publication).pipe(retry(2)).subscribe({
      next: createdPublication => {
        this.publicationsSignal.update(publications => [...publications, createdPublication]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create publication'));
        this.loadingSignal.set(false);
      }
    });
  }

  updatePublication(updatedPublication: Publication): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.communityApi.updatePublication(updatedPublication).pipe(retry(2)).subscribe({
      next: publication => {
        this.publicationsSignal.update(publications => publications.map(p => p.id === publication.id ? publication : p));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update publication'));
        this.loadingSignal.set(false);
      }
    });
  }

  deletePublication(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.communityApi.deletePublication(id).pipe(retry(2)).subscribe({
      next: () => {
        this.publicationsSignal.update(publications => publications.filter((p => p.id !== id)));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete publication'));
        this.loadingSignal.set(false);
      }
    });
  }


  getAnswerById(id: number): Signal<Answer | undefined>{
    return computed(() => id? this.answers().find(a => a.id === id): undefined);
  }

  addAnswer(answer: Answer): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.communityApi.createAnswer(answer).pipe(retry(2)).subscribe({
      next: createdAnswer => {
        this.answersSignal.update(answers => [...answers, createdAnswer]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create answer'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateAnswer(updatedAnswer: Answer): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.communityApi.updateAnswer(updatedAnswer).pipe(retry(2)).subscribe({
      next: answer => {
        this.answersSignal.update(answers => answers.map(a => a.id === answer.id ? answer : a));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update answer'));
        this.loadingSignal.set(false);
      }
    });
  }

  deleteAnswer(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.communityApi.deleteAnswer(id).pipe(retry(2)).subscribe({
      next: () => {
        this.answersSignal.update(answers => answers.filter((a => a.id !== id)));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete answer'));
        this.loadingSignal.set(false);
      }
    });
  }

}
