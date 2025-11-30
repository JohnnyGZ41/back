import {BaseApiEndpoint} from '../../../shared/infrastructure/base-api-endpoint';
import {Profile} from '../../domain/model/profile.entity';
import {ProfileResource} from '../resources/profile-resource';
import {ProfilesResponse} from '../responses/profiles-response';
import {ProfileAssembler} from '../assemblers/profile-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

export class ProfilesApiEndpoint extends BaseApiEndpoint
  <Profile, ProfileResource, ProfilesResponse, ProfileAssembler> {

  constructor(http: HttpClient) {
    super(http, `${environment.apiBaseUrl}${environment.profilesEndpointPath}`, new ProfileAssembler());
  }
}
