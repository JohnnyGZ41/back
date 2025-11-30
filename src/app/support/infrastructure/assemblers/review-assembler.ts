import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {ReviewResource} from '../resources/review-resource';
import {Review} from '../../domain/model/review.entity';
import {ReviewsResponse} from '../responses/reviews-response';

export class ReviewAssembler implements BaseAssembler<Review, ReviewResource, ReviewsResponse> {
  toEntityFromResource(resource: ReviewResource): Review{

    return new Review({
      id:resource.id,
      userId: resource.userId,
      projectId: resource.projectId,
      comment:resource.comment,
      rating: resource.rating,
      creationDate:resource.creationDate
    });
  }
  toEntitiesFromResponse(response: ReviewsResponse){
    return response.reviews.map(review => this.toEntityFromResource(review));
  }

  toResourceFromEntity(entity:Review){
    return {
      id:entity.id,
      userId: entity.userId,
      projectId: entity.projectId,
      comment:entity.comment,
      rating: entity.rating,
      creationDate:entity.creationDate
    } as ReviewResource;
  }
}
