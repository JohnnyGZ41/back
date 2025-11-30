import {BaseApiEndpoint} from '../../../shared/infrastructure/base-api-endpoint';
import {Answer} from '../../domain/model/answer.entity';
import {AnswerResource} from '../resources/answer-resource';
import {AnswersResponse} from '../responses/answers-response';
import {AnswerAssembler} from '../assemblers/answer-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

export class AnswersApiEndpoint extends BaseApiEndpoint
  <Answer, AnswerResource, AnswersResponse, AnswerAssembler>{

  constructor(http: HttpClient) {
    super(http, `${environment.apiBaseUrl}${environment.answersEndpointPath}`, new AnswerAssembler());
  }
}
