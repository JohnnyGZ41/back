import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReviewsApiEndpoint} from './reviews-api-endpoint';
import {Review} from '../../domain/model/review.entity';
import {BaseApi} from '../../../shared/infrastructure/base-api';

@Injectable({providedIn: 'root'})
export class SupportApi extends BaseApi{
  private readonly reviewsEndPoint: ReviewsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.reviewsEndPoint=new ReviewsApiEndpoint(http);
  }

  getReviews():Observable<Review[]>{
    return  this.reviewsEndPoint.getAll();
  }
  getReview(id:number){
    return  this.reviewsEndPoint.getById(id);
  }
  createReview(review:Review):Observable<Review>{
    return this.reviewsEndPoint.create(review);
  }
  deleteReview(id:number):Observable<void>{
    return this.reviewsEndPoint.delete(id);
  }
}
