import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {ProfileResource} from '../resources/profile-resource';
import {ProfilesResponse} from '../responses/profiles-response';
import {Profile} from '../../domain/model/profile.entity';

export class ProfileAssembler implements BaseAssembler<Profile, ProfileResource, ProfilesResponse> {
  toEntityFromResource(resource: ProfileResource): Profile {
    return new Profile({
      id: resource.id,
      description: resource.description,
      creationDate: resource.creationDate,
      image: resource.image,
      accountId: resource.accountId,
      portfolioId: resource.portfolioId,
      groupProjectIds: resource.groupProjectIds
    })
  }

  toEntitiesFromResponse(response: ProfilesResponse): Profile[] {
    return response.profiles.map(profile => this.toEntityFromResource(profile));
  }

  toResourceFromEntity(entity: Profile): ProfileResource {
    return {
      id: entity.id,
      description: entity.description,
      creationDate: entity.creationDate,
      image: entity.image,
      accountId: entity.accountId,
      portfolioId: entity.portfolioId,
      groupProjectIds: entity.groupProjectIds
    } as ProfileResource;
  }

}
