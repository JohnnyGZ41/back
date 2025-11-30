import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface PortfolioResource extends BaseResource {
  id: number,
  creationDate: Date,
  gameIds: number[],
  audioIds: number[],
  artIds: number[]

}
