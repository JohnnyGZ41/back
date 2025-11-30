import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ReviewAssembler} from '../assemblers/review-assembler';
import {BaseApiEndpoint} from '../../../shared/infrastructure/base-api-endpoint';
import {ReviewResource} from '../resources/review-resource';
import {Review} from '../../domain/model/review.entity';
import {ReviewsResponse} from '../responses/reviews-response';

export class ReviewsApiEndpoint extends BaseApiEndpoint<Review, ReviewResource, ReviewsResponse, ReviewAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiBaseUrl}${environment.reviewsEndpointPath}`, new ReviewAssembler());
  }
}
