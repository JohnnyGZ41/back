import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface AnswerResource extends BaseResource {
  id: number,
  userId: number,
  publicationId: number,
  comment: string,
  creationDate: Date,
}
