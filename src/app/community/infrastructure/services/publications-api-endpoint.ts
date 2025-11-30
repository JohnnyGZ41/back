import {BaseApiEndpoint} from '../../../shared/infrastructure/base-api-endpoint';
import {Publication} from '../../domain/model/publication.entity';
import {PublicationResource} from '../resources/publication-resource';
import {PublicationsResponse} from '../responses/publications-response';
import {PublicationAssembler} from '../assemblers/publication-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

export class PublicationsApiEndpoint extends BaseApiEndpoint
  <Publication, PublicationResource, PublicationsResponse, PublicationAssembler> {

  constructor(http: HttpClient) {
    super(http, `${environment.apiBaseUrl}${environment.publicationsEndpointPath}`, new PublicationAssembler());
  }
}
