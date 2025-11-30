import {computed, Injectable, Signal, signal} from '@angular/core';
import {ShoppingCart} from '../domain/model/shopping-cart.entity';
import {PaymentApi} from '../infrastructure/services/payment-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PaymentStore {
  private readonly shoppingCartsSignal = signal<ShoppingCart[]>([]);
  readonly shoppingCarts = this.shoppingCartsSignal.asReadonly();

  readonly shoppingCartCount = computed(() => this.shoppingCarts().length);

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  private _currentShoppingCart: ShoppingCart | undefined = undefined;

  constructor(private paymentApi: PaymentApi) {
    this.loadShoppingCarts();
  }

  get currentShoppingCart(): ShoppingCart | undefined {
    return this._currentShoppingCart;
  }
  set currentShoppingCart(value: ShoppingCart) {
    this._currentShoppingCart = value;
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? '${fallback}: Not found' : error.message;
    }
    return fallback;
  }

  private loadShoppingCarts(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentApi.getShoppingCarts().pipe(takeUntilDestroyed()).subscribe({
      next: shoppingCarts => {
        this.shoppingCartsSignal.set(shoppingCarts);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load shopping carts'));
        this.loadingSignal.set(false);
      }
    });
  }

  getShoppingCartById(id: number): Signal<ShoppingCart | undefined>{
    return computed(() => id? this.shoppingCarts().find(s => s.id === id): undefined);
  }

  getCartByProfileId(profileId: number): Signal<ShoppingCart | undefined> {
    return computed(() =>
      this.shoppingCarts().find(s => s.profileId === profileId)
    );
  }

  addGameToCart(profileId: number, gameId: number, price: number): void {
    const currentCart = this.shoppingCarts().find(s => s.profileId === profileId);

    if (currentCart) {
      const updatedCart = new ShoppingCart({
        id: currentCart.id,
        profileId: currentCart.profileId,
        gameIds: [...currentCart.gameIds, gameId],
        creationDate: currentCart.creationDate,
        price: currentCart.price + price,
      });
      this.updateShoppingCart(updatedCart);
    } else {
      const newCart = new ShoppingCart({
        id: this.shoppingCartCount() + 1,
        profileId: profileId,
        gameIds: [gameId],
        creationDate: new Date(),
        price: price,
      });
      this.addShoppingCart(newCart);
    }
  }

  removeGameFromCart(profileId: number, gameId: number, price: number): void {
    const currentCart = this.shoppingCarts().find(s => s.profileId === profileId);

    if (!currentCart) {
      return;
    }

    const indexToRemove = currentCart.gameIds.indexOf(gameId);

    if (indexToRemove === -1) {
      return;
    }

    const newGameIds = [...currentCart.gameIds];
    newGameIds.splice(indexToRemove, 1);

    const updatedCart = new ShoppingCart({
      id: currentCart.id,
      profileId: currentCart.profileId,
      gameIds: newGameIds,
      creationDate: currentCart.creationDate,
      price: currentCart.price - price, // Restar el precio
    });

    if (newGameIds.length === 0) {
      this.deleteShoppingCart(currentCart.id);
    } else {
      this.updateShoppingCart(updatedCart);
    }
  }

  addShoppingCart(shoppingCart: ShoppingCart): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentApi.createShoppingCart(shoppingCart).pipe(retry(2)).subscribe({
      next: createdShoppingCart => {
        this.shoppingCartsSignal.update(shoppingCarts => [...shoppingCarts, createdShoppingCart]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create shopping cart'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateShoppingCart(updatedShoppingCart: ShoppingCart): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentApi.updateShoppingCart(updatedShoppingCart).pipe(retry(2)).subscribe({
      next: shoppingCart => {
        this.shoppingCartsSignal.update(shoppingCarts => shoppingCarts.map(s => s.id === shoppingCart.id ? shoppingCart : s));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update shopping cart'));
        this.loadingSignal.set(false);
      }
    });
  }

  deleteShoppingCart(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentApi.deleteShoppingCart(id).pipe(retry(2)).subscribe({
      next: () => {


        this.shoppingCartsSignal.update(shoppingCarts => shoppingCarts.filter((s => s.id !== id)));
        this.loadingSignal.set(false);
      },
      error: err => {

        this.shoppingCartsSignal.update(shoppingCarts => shoppingCarts.filter((s => s.id !== id)));
        this.errorSignal.set(this.formatError(err, 'Failed to delete shopping cart'));
        this.loadingSignal.set(false);
      }
    });
  }

}
