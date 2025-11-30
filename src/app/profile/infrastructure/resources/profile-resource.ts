import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface ProfileResource extends BaseResource {
  id: number;
  description: string;
  creationDate: Date;
  image: string;
  accountId: number;
  portfolioId: number | null;
  groupProjectIds: number[] | null;
}
