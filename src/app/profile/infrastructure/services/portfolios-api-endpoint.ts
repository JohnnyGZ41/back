import {BaseApiEndpoint} from '../../../shared/infrastructure/base-api-endpoint';
import {Portfolio} from '../../domain/model/portfolio.entity';
import {PortfolioResource} from '../resources/portfolio-resource';
import {PortfoliosResponse} from '../responses/portfolios-response';
import {PortfolioAssembler} from '../assemblers/portfolio-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

export class PortfoliosApiEndpoint extends BaseApiEndpoint
  <Portfolio, PortfolioResource, PortfoliosResponse, PortfolioAssembler>{

  constructor(http: HttpClient) {
    super(http, `${environment.apiBaseUrl}${environment.portfoliosEndpointPath}`, new PortfolioAssembler());
  }
}
