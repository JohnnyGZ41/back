import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface ShoppingCartResource extends BaseResource{
  id: number,
  profileId: number,
  gameIds: number[],
  creationDate: Date,
  price: number,
}
