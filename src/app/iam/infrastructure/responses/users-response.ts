import {UserResource} from '../resources/user-resource';
import {BaseResponse} from '../../../shared/infrastructure/base-response';

export interface UsersResponse extends BaseResponse {
  users: UserResource[];
}
