import {GameCategory} from '../../domain/model/game-category';
import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface GameResource extends BaseResource {
  id:number,
  authorId: number,
  name:string,
  description:string,
  rating:number,
  creationDate:Date,
  price:number,
  category:GameCategory,
  image:string
}
