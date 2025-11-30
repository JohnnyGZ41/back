import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface GroupProjectResource extends BaseResource {
  id: number,
  memberIds: number[],
  gameId: number
}
