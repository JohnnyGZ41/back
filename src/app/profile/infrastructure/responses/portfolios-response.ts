import {BaseResponse} from '../../../shared/infrastructure/base-response';
import {PortfolioResource} from '../resources/portfolio-resource';

export interface PortfoliosResponse extends BaseResponse {
  portfolios: PortfolioResource[];
}
