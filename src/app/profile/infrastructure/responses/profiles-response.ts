import {BaseResponse} from '../../../shared/infrastructure/base-response';
import {ProfileResource} from '../resources/profile-resource';

export interface ProfilesResponse extends BaseResponse {
  profiles: ProfileResource[];
}
