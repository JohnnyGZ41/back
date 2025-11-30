import {BaseApiEndpoint} from '../../../shared/infrastructure/base-api-endpoint';
import {User} from '../../domain/model/user.entity';
import {UserResource} from '../resources/user-resource';
import {UsersResponse} from '../responses/users-response';
import {UserAssembler} from '../assemblers/user-assembler';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../../environments/environment';

export class UsersApiEndpoint extends BaseApiEndpoint<User, UserResource, UsersResponse, UserAssembler>{
  constructor(http: HttpClient) {
    super(http, `${environment.apiBaseUrl}${environment.usersEndpointPath}`, new UserAssembler());
  }
}
