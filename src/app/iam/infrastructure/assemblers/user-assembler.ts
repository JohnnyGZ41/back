import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {UsersResponse} from '../responses/users-response';
import {User} from '../../domain/model/user.entity';
import {UserResource} from '../resources/user-resource';

export class UserAssembler implements BaseAssembler <User, UserResource, UsersResponse>  {

  toEntityFromResource(resource: UserResource): User{
    return new User({
      id: resource.id,
      name: resource.name,
      phoneNumber: resource.phoneNumber
    });
  }
  toEntitiesFromResponse(response: UsersResponse){
    return response.users.map(user => this.toEntityFromResource(user));
  }

  toResourceFromEntity(entity:User){
    return {
      id: entity.id,
      name: entity.name,
      phoneNumber: entity.phoneNumber
    } as UserResource;
  }

}
