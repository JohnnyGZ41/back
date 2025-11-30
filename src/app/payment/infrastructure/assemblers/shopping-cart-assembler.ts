import {BaseAssembler} from '../../../shared/infrastructure/base-assembler';
import {ShoppingCart} from '../../domain/model/shopping-cart.entity';
import {ShoppingCartResource} from '../resources/shopping-cart-resource';
import {ShoppingCartsResponse} from '../responses/shopping-carts-response';

export class ShoppingCartAssembler implements BaseAssembler<ShoppingCart, ShoppingCartResource, ShoppingCartsResponse>{

  toEntityFromResource(resource: ShoppingCartResource): ShoppingCart {
    return new ShoppingCart({
      id: resource.id,
      profileId: resource.profileId,
      gameIds: resource.gameIds,
      creationDate: resource.creationDate,
      price: resource.price
    });
  }

  toEntitiesFromResponse(response: ShoppingCartsResponse): ShoppingCart[] {
    return response.shoppingCarts.map(s => this.toEntityFromResource(s));
  }

  toResourceFromEntity(entity: ShoppingCart): ShoppingCartResource {
    return {
      id: entity.id,
      profileId: entity.profileId,
      gameIds: entity.gameIds,
      creationDate: entity.creationDate,
      price: entity.price
    } as ShoppingCartResource;
  }

}
