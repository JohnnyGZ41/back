import {BaseResponse} from '../../../shared/infrastructure/base-response';
import {GroupProjectResource} from '../resources/group-project-resource';

export interface GroupProjectsResponse extends BaseResponse {
  groupProjects: GroupProjectResource[];
}
