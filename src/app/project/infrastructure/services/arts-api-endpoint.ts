import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {BaseApiEndpoint} from '../../../shared/infrastructure/base-api-endpoint';
import {ArtAssembler} from '../assemblers/art-assembler';
import {Art} from '../../domain/model/art.entity';
import {ArtsResponse} from '../responses/arts-response';
import {ArtResource} from '../resources/art-resource';

export class ArtsApiEndpoint extends BaseApiEndpoint<Art, ArtResource, ArtsResponse, ArtAssembler>{
  constructor(http: HttpClient) {
    super(http, `${environment.apiBaseUrl}${environment.artsEndpointPath}`, new ArtAssembler());
  }
}

