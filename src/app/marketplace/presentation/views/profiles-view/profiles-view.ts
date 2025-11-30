import {Component, computed, inject, signal} from '@angular/core';
import {ProfileStore} from '../../../../profile/application/profile.store';
import {IamStore} from '../../../../iam/application/iam.store';
import {AccountType} from '../../../../iam/domain/model/account-type';
import {DatePipe} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {Profile} from '../../../../profile/domain/model/profile.entity';

@Component({
  selector: 'app-profiles-view',
  imports: [
    DatePipe,
    RouterLink,
    RouterLinkActive,
    TranslatePipe
  ],
  templateUrl: './profiles-view.html',
  styleUrl: './profiles-view.css',
})
export class ProfilesView {

  private profileStore = inject(ProfileStore);
  private iamStore = inject(IamStore);

  profiles = this.profileStore.profiles;

  standards = computed(() => this.profiles().filter(p =>
      this.iamStore.accounts().find(a => p.accountId === a.id)?.role === AccountType.STANDARD
    )
  );

  developers = computed(() => this.profiles().filter(p =>
      this.iamStore.accounts().find(a => p.accountId === a.id)?.role === AccountType.PROGRAMMER
    )
  );

  artists = computed(() => this.profiles().filter(p =>
      this.iamStore.accounts().find(a => p.accountId === a.id)?.role === AccountType.ARTIST
    )
  );

  composers = computed(() => this.profiles().filter(p =>
      this.iamStore.accounts().find(a => p.accountId === a.id)?.role === AccountType.COMPOSER
    )
  );

  marketplaceOptions = [
    {link: "/marketplace/games", label: "marketplace.games"},
    {link: "/marketplace/arts", label: "marketplace.arts"},
    {link: "/marketplace/audios", label: "marketplace.audios"},
    {link: "/marketplace/profiles", label: "marketplace.profiles"},
  ]

  searchTerm = signal('');

  filteredProfiles = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.profiles();

    return this.profiles().filter(profile => {
        const account = this.iamStore.accounts().find(a => a.id === profile.id)!;
        const user = this.iamStore.getUserById(account?.userId)()!;
        return user.name.toLowerCase().includes(term)
      }
    );
  });

  onSearch() {
    console.log('Buscando:', this.searchTerm());
  }

  getProfileUser(profile: Profile) {
    const account =  this.iamStore.getAccountById(profile.accountId)()!;
    return this.iamStore.getUserById(account.userId)()!;
  }

}
