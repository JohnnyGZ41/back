import {BaseResponse} from '../../../shared/infrastructure/base-response';
import {ReviewResource} from '../resources/review-resource'

export interface ReviewsResponse extends BaseResponse {
  reviews: ReviewResource[];
}
