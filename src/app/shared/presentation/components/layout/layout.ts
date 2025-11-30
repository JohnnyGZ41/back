import {Component, computed, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {IamStore} from '../../../../iam/application/iam.store';
import {ProfileStore} from '../../../../profile/application/profile.store';
import {PaymentStore} from '../../../../payment/application/payment.store';
import {MatIcon} from '@angular/material/icon';
import {MatBadge} from '@angular/material/badge';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet, RouterLink, MatToolbarRow, MatToolbar, MatButton,
    RouterLinkActive, TranslatePipe, LanguageSwitcher, MatIcon, MatBadge
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  // Hacemos publico el router para poder usarlo en el HTML (Sign Out)
  public router = inject(Router);

  readonly iamStore = inject(IamStore);
  readonly profileStore = inject(ProfileStore);
  readonly paymentStore = inject(PaymentStore);

  options = [
    {link: '/marketplace/home', label: 'option.home'},
    {link: '/community/forum', label: 'option.forum'},
  ];
  optional = [
    {link: '/sign-up', label: 'option.sign-up'},
    {link: '/log-in', label: 'option.log-in'},
  ]

  // CORRECCIÓN: Usamos currentAccountIdSignal() con paréntesis
  currentProfile = computed(() =>
    this.profileStore.profiles().find(p =>
      p.accountId === this.iamStore.currentAccountIdSignal()));

  // CORRECCIÓN: Usamos currentAccountIdSignal() con paréntesis y el ! para asegurar que existe
  currentUser = computed(() => {
    const accountId = this.iamStore.currentAccountIdSignal();
    // Si no hay cuenta, devolvemos undefined
    if (!accountId) return undefined;

    // Obtenemos la cuenta para sacar el userId
    const account = this.iamStore.accounts().find(a => a.id === accountId);
    if (!account) return undefined;

    // Buscamos el usuario
    return this.iamStore.getUserById(account.userId)();
  });

  cartItemCount = computed(() => {
    const profile = this.currentProfile();
    if (!profile) return 0;
    const cart = this.paymentStore.getCartByProfileId(profile.id)();
    return cart?.gameIds?.length ?? 0;
  });

  goToCart() {
    this.router.navigate(['/cart']).then();
  }

  selectProfile(){
    // Verificamos la señal
    if(!this.iamStore.currentAccountIdSignal()) return;
    this.router.navigate([`/profile/${this.currentProfile()?.id}`]).then();
  }
}
