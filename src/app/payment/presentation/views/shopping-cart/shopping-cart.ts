import {Component, computed, inject} from '@angular/core';
import {PaymentStore} from '../../../application/payment.store';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {IamStore} from '../../../../iam/application/iam.store';
import {ProfileStore} from '../../../../profile/application/profile.store';
import {Router} from '@angular/router';
import {Project} from '../../../../project/application/project.store'; // 1. Importar el Store de Juegos

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent,
    MatButton, MatIcon, CurrencyPipe, TranslatePipe
  ],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css'
})
export class ShoppingCart {
  readonly paymentStore = inject(PaymentStore);
  readonly iamStore = inject(IamStore);
  readonly profileStore = inject(ProfileStore);
  readonly projectStore = inject(Project); // 2. Inyectar el Store
  private router = inject(Router);

  // Obtiene el carrito del usuario actual
  cart = computed(() => {
    const account = this.iamStore.currentAccount;
    if (!account) return null;

    const profile = this.profileStore.profiles().find(p => p.accountId === account.id);
    if (!profile) return null;

    return this.paymentStore.getCartByProfileId(profile.id)() || null;
  });

  // Lista de IDs de juegos
  cartItems = computed(() => this.cart()?.gameIds || []);

  // 3. NUEVO: Detalles de los juegos para el HTML
  // Transforma [1, 2] en [{game: Game1}, {game: Game2}] para que el HTML pueda usar item.game.id
  cartItemsDetail = computed(() => {
    const ids = this.cartItems();
    const allGames = this.projectStore.games();

    return ids.map(id => {
      const game = allGames.find(g => g.id === id);
      return game ? { game } : null; // Retornamos un objeto con la propiedad 'game'
    }).filter(item => item !== null); // Filtramos los que no se encuentren
  });

  totalPrice = computed(() => {
    return this.cart()?.price || 0;
  });

  checkout() {
    console.log('Proceeding to checkout...');
  }

  // Método para eliminar del carrito
  removeItem(gameId: number, price: number) {
    const account = this.iamStore.currentAccount;
    if (!account) return;

    const profile = this.profileStore.profiles().find(p => p.accountId === account.id);
    if (profile) {
      this.paymentStore.removeGameFromCart(profile.id, gameId, price);
    }
  }
}
