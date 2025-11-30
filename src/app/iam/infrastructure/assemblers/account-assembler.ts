import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {AccountResource} from '../resources/account-resource';
import {AccountsResponse} from '../responses/accounts-response';
import {Account} from '../../domain/model/account.entity';
import {AccountType} from '../../domain/model/account-type';

export class AccountAssembler implements BaseAssembler<Account, AccountResource, AccountsResponse> {

  toEntityFromResource(resource: AccountResource){
    return new Account({
      id: resource.id,
      userId: resource.userId,
      email: resource.email,
      password: resource.password,
      isActive: resource.isActive,
      role: AccountType[resource.role as keyof typeof AccountType]
    })
  }
  toEntitiesFromResponse(response: AccountsResponse) {
    return  response.accounts.map(account => this.toEntityFromResource(account));
  }

  toResourceFromEntity(entity: Account) {
    return {
      id: entity.id,
      userId: entity.userId,
      email: entity.email,
      password: entity.password,
      isActive: entity.isActive,
      role: AccountType[entity.role]
    } as AccountResource;
  }
}
