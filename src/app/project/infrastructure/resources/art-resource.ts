import {ArtCategory} from '../../domain/model/art-category';
import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface ArtResource extends BaseResource {
  id: number,
  authorId: number,
  name: string,
  description: string,
  rating: number,
  creationDate: Date,
  image: string,
  category:ArtCategory
}
