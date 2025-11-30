import {BaseResponse} from '../../../shared/infrastructure/base-response';
import {AnswerResource} from '../resources/answer-resource';

export interface AnswersResponse extends BaseResponse {
  answers: AnswerResource[];
}
