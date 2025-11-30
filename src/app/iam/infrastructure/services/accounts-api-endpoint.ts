import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {AccountAssembler} from '../assemblers/account-assembler';
import {BaseApiEndpoint} from '../../../shared/infrastructure/base-api-endpoint';
import {AccountResource} from '../resources/account-resource';
import {Account} from '../../domain/model/account.entity';
import {AccountsResponse} from '../responses/accounts-response';

export class AccountsApiEndpoint extends BaseApiEndpoint<Account, AccountResource, AccountsResponse, AccountAssembler> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiBaseUrl}${environment.accountsEndpointPath}`, new AccountAssembler());
  }
}
