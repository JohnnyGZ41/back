import {Observable, retry} from 'rxjs';
import {computed, Injectable, Signal, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Review} from '../domain/model/review.entity';
import {SupportApi} from '../infrastructure/services/support-api';



@Injectable({ providedIn: 'root' })
export class SupportStore {
  private readonly reviewsSignal = signal<Review[]>([]);
  readonly reviews= this.reviewsSignal.asReadonly();

  readonly reviewCount=computed(()=>this.reviews().length);

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  private _currentReview: Review | undefined = undefined;


  constructor(private supportApi:SupportApi) {
    this.loadReviews();
  }

  get currentReview():Review | undefined{
    return this._currentReview;
  }


  private loadReviews():void{
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.supportApi.getReviews().pipe(takeUntilDestroyed()).subscribe({
      next: reviews =>{
        console.log(reviews);
        this.reviewsSignal.set(reviews);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load review'));
        this.loadingSignal.set(false);
      }
    });
  }
  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? '${fallback}: Not found' : error.message;
    }
    return fallback;
  }

  getReviewById(id:number):Signal<Review|undefined>{
    return computed(()=> id? this.reviews().find(u => u.id === id):undefined);
  }

  getReviewsByProjectId(projectId: number): Signal<Review[]> {
    return computed(() =>
      this.reviews().filter(r => r.projectId === projectId)
    );
  }
  addReview(review: Review): void  {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.supportApi.createReview(review).pipe(retry(2)).subscribe({
      next: createdReview => {
        this.reviewsSignal.update(reviews=>[...reviews,createdReview]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to add review'));
        this.loadingSignal.set(false);
      }
    })
  }

  deleteReview(id:number):void  {
    this.loadingSignal.set(false);
    this.errorSignal.set(null);
    this.supportApi.deleteReview(id).pipe(retry(2)).subscribe({
      next:()=>{
        this.loadingSignal.set(false);
        this.reviewsSignal.update(reviews=>reviews.filter((u=>u.id!==id)));
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete review'));
        this.loadingSignal.set(false);
      }
    })
  }

}
