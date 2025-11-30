import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface UserResource extends BaseResource{
  id: number;
  name: string;
  phoneNumber: string;
}
