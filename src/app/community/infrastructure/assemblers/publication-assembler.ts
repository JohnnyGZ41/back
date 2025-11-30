import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {Publication} from '../../domain/model/publication.entity';
import {PublicationResource} from '../resources/publication-resource';
import {PublicationsResponse} from '../responses/publications-response';

export class PublicationAssembler implements BaseAssembler<Publication, PublicationResource, PublicationsResponse>{

  toEntityFromResource(resource: PublicationResource): Publication {
    return new Publication({
      id: resource.id,
      userId: resource.userId,
      title: resource.title,
      comment: resource.comment,
      image: resource.image,
      creationDate: resource.creationDate,
    })
  }

  toEntitiesFromResponse(response: PublicationsResponse): Publication[] {
    return response.publications.map(p => this.toEntityFromResource(p));
  }

  toResourceFromEntity(entity: Publication): PublicationResource {
    return {
      id: entity.id,
      userId: entity.userId,
      title: entity.title,
      comment: entity.comment,
      image: entity.image,
      creationDate: entity.creationDate,
    } as PublicationResource;
  }
}
