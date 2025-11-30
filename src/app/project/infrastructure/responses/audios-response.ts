import {BaseResponse} from '../../../shared/infrastructure/base-response';
import {AudioResource} from '../resources/audio-resource';

export interface AudiosResponse extends BaseResponse{
  audios:AudioResource[];
}
