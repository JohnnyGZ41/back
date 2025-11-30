import {BaseResource} from '../../../shared/infrastructure/base-resource';
import {UserResource} from '../../../iam/infrastructure/resources/user-resource';

export interface ReviewResource extends BaseResource {
  id: number;
  userId: number;
  projectId: number;
  comment:string;
  rating:number;
  creationDate:string;
}
