import {BaseResponse} from '../../../shared/infrastructure/base-response';
import {ArtResource} from '../resources/art-resource';

export interface ArtsResponse extends BaseResponse {
  arts:ArtResource[];
}
