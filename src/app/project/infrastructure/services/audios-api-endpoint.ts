import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {BaseApiEndpoint} from '../../../shared/infrastructure/base-api-endpoint';
import {Audio} from '../../domain/model/audio.entity';
import {AudiosResponse} from '../responses/audios-response';
import {AudioResource} from '../resources/audio-resource';
import {AudioAssembler} from '../assemblers/audio-assembler';


export class AudiosApiEndpoint extends BaseApiEndpoint<Audio, AudioResource, AudiosResponse, AudioAssembler>{
  constructor(http: HttpClient) {
    super(http, `${environment.apiBaseUrl}${environment.audiosEndpointPath}`, new AudioAssembler());
  }
}
