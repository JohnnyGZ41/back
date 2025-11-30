import {BaseApiEndpoint} from '../../../shared/infrastructure/base-api-endpoint';
import {ShoppingCart} from '../../domain/model/shopping-cart.entity';
import {ShoppingCartResource} from '../resources/shopping-cart-resource';
import {ShoppingCartsResponse} from '../responses/shopping-carts-response';
import {ShoppingCartAssembler} from '../assemblers/shopping-cart-assembler';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

export class ShoppingCartsApiEndpoint extends BaseApiEndpoint
  <ShoppingCart, ShoppingCartResource, ShoppingCartsResponse, ShoppingCartAssembler>{

  constructor(http: HttpClient) {
    super(http, `${environment.apiBaseUrl}${environment.shoppingCartsEndpointPath}`, new ShoppingCartAssembler());
  }
}
