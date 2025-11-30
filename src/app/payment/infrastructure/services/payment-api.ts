import {Injectable} from '@angular/core';
import {BaseApi} from '../../../shared/infrastructure/base-api';
import {ShoppingCartsApiEndpoint} from './shopping-carts-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShoppingCart} from '../../domain/model/shopping-cart.entity'

@Injectable ({providedIn: 'root'})
export class PaymentApi extends BaseApi {
  private shoppingCartsEndpoint: ShoppingCartsApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.shoppingCartsEndpoint = new ShoppingCartsApiEndpoint(http);
  }

  getShoppingCarts(): Observable<ShoppingCart[]>{
    return this.shoppingCartsEndpoint.getAll();
  }
  getShoppingCart(id: number): Observable<ShoppingCart>{
    return this.shoppingCartsEndpoint.getById(id);
  }
  createShoppingCart(shoppingCart: ShoppingCart): Observable<ShoppingCart>{
    return this.shoppingCartsEndpoint.create(shoppingCart);
  }
  updateShoppingCart(shoppingCart: ShoppingCart): Observable<ShoppingCart>{
    return this.shoppingCartsEndpoint.update(shoppingCart, shoppingCart.id);
  }
  deleteShoppingCart(id: number): Observable<void>{
    return this.shoppingCartsEndpoint.delete(id);
  }


}
