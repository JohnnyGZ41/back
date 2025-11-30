import {BaseApiEndpoint} from '../../../shared/infrastructure/base-api-endpoint';
import {GroupProject} from '../../domain/model/group-project.entity';
import {GroupProjectResource} from '../resources/group-project-resource';
import {GroupProjectsResponse} from '../responses/group-projects-response';
import {GroupProjectAssembler} from '../assemblers/group-project-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

export class GroupProjectsApiEndpoint extends BaseApiEndpoint
  <GroupProject, GroupProjectResource, GroupProjectsResponse, GroupProjectAssembler>{

  constructor(http: HttpClient) {
    super(http, `${environment.apiBaseUrl}${environment.groupProjectsEndpointPath}`, new GroupProjectAssembler());
  }

}
