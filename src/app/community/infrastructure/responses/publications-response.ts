import {BaseResponse} from '../../../shared/infrastructure/base-response';
import {PublicationResource} from '../resources/publication-resource';

export interface PublicationsResponse extends BaseResponse {
  publications: PublicationResource[];
}
