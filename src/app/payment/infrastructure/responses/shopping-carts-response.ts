import {BaseResponse} from '../../../shared/infrastructure/base-response';
import {ShoppingCartResource} from '../resources/shopping-cart-resource';

export interface ShoppingCartsResponse extends BaseResponse {
  shoppingCarts: ShoppingCartResource[];
}
