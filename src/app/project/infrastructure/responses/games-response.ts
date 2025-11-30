import {BaseResponse} from '../../../shared/infrastructure/base-response';
import {GameResource} from '../resources/game-resource';

export interface GamesResponse extends BaseResponse {
  games:GameResource[];
}
