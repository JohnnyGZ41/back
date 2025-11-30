import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {AnswerResource} from '../resources/answer-resource';
import {AnswersResponse} from '../responses/answers-response';
import {Answer} from '../../domain/model/answer.entity';

export class AnswerAssembler implements BaseAssembler<Answer, AnswerResource, AnswersResponse> {

  toEntityFromResource(resource: AnswerResource): Answer {
    return new Answer({
      id: resource.id,
      userId: resource.userId,
      publicationId: resource.publicationId,
      comment: resource.comment,
      creationDate: resource.creationDate,
    })
  }

  toEntitiesFromResponse(response: AnswersResponse): Answer[] {
    return response.answers.map(a => this.toEntityFromResource(a));
  }

  toResourceFromEntity(entity: Answer): AnswerResource {
    return {
      id: entity.id,
      userId: entity.userId,
      publicationId: entity.publicationId,
      comment: entity.comment,
      creationDate: entity.creationDate,
    } as AnswerResource;
  }
}
