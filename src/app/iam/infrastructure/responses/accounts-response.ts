import {BaseResponse} from '../../../shared/infrastructure/base-response';
import {AccountResource} from '../resources/account-resource';

export interface AccountsResponse extends BaseResponse {
  accounts: AccountResource[];
}
