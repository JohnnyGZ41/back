import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {PortfolioResource} from '../resources/portfolio-resource';
import {PortfoliosResponse} from '../responses/portfolios-response';
import {Portfolio} from '../../domain/model/portfolio.entity';

export class PortfolioAssembler implements BaseAssembler<Portfolio, PortfolioResource, PortfoliosResponse> {

  toEntityFromResource(resource: PortfolioResource): Portfolio {
    return new Portfolio({
      id: resource.id,
      creationDate: resource.creationDate,
      gameIds: resource.gameIds,
      audioIds: resource.audioIds,
      artIds: resource.artIds,
    });
  }

  toEntitiesFromResponse(response: PortfoliosResponse): Portfolio[] {
    return response.portfolios.map(portfolio => this.toEntityFromResource(portfolio));
  }

  toResourceFromEntity(entity: Portfolio): PortfolioResource {
    return {
      id: entity.id,
      creationDate: entity.creationDate,
      gameIds: entity.gameIds,
      audioIds: entity.audioIds,
      artIds: entity.artIds
    } as PortfolioResource;
  }

}
