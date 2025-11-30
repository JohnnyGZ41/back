import {AccountType} from '../../domain/model/account-type';
import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface AccountResource extends BaseResource {
  id: number;
  userId: number;
  email: string;
  password: string;
  isActive: boolean;
  role: string
}
