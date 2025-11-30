import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {BaseApiEndpoint} from '../../../shared/infrastructure/base-api-endpoint';
import {Game} from '../../domain/model/game.entity';
import {GameResource} from '../resources/game-resource';
import {GamesResponse} from '../responses/games-response';
import {GameAssembler} from '../assemblers/game-assembler';

export class GamesApiEndpoint extends BaseApiEndpoint<Game, GameResource, GamesResponse, GameAssembler>{
  constructor(http: HttpClient) {
    super(http, `${environment.apiBaseUrl}${environment.gamesEndpointPath}`, new GameAssembler());
  }
}
