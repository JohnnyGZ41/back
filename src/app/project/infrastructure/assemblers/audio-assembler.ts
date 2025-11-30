import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {AudioResource} from '../resources/audio-resource';
import {Audio} from '../../domain/model/audio.entity';
import {AudiosResponse} from '../responses/audios-response';

export class AudioAssembler implements BaseAssembler<Audio, AudioResource, AudiosResponse>{
  toEntityFromResource(resource: AudioResource): Audio{

    return new Audio({
      id:resource.id,
      authorId: resource.authorId,
      name: resource.name,
      description: resource.description,
      rating: resource.rating,
      creationDate: resource.creationDate,
      audioUrl:resource.audioUrl,
      format:resource.format,
      category:resource.category,
      image:resource.image,
    });
  }
  toEntitiesFromResponse(response: AudiosResponse){
    return response.audios.map(audio => this.toEntityFromResource(audio));
  }

  toResourceFromEntity(entity:Audio){
    return {
      id:entity.id,
      authorId: entity.authorId,
      name: entity.name,
      description: entity.description,
      rating: entity.rating,
      creationDate: entity.creationDate,
      audioUrl:entity.audioUrl,
      format:entity.format,
      category:entity.category,
      image:entity.image,
    } as AudioResource;
  }
}
