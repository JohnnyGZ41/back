import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';

import {Project} from '../../../../project/application/project.store';
import {TranslatePipe} from '@ngx-translate/core';
import {ProfileStore} from '../../../../profile/application/profile.store';
import {IamStore} from '../../../../iam/application/iam.store';
import {AccountType} from '../../../../iam/domain/model/account-type';
import {Profile} from '../../../../profile/domain/model/profile.entity';


@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslatePipe
  ],
  templateUrl: './home-view.html',
  styleUrl: './home-view.css'
})
export class HomeView {

  private projectStore = inject(Project);
  private profileStore = inject(ProfileStore);
  private iamStore = inject(IamStore);

  games = computed(() => this.projectStore.games());
  arts = computed(() => this.projectStore.arts());
  audios = computed(() => this.projectStore.audios());
  profiles = computed(() => this.profileStore.profiles())


  marketplaceOptions = [
    {link: "/marketplace/games", label: "marketplace.games"},
    {link: "/marketplace/arts", label: "marketplace.arts"},
    {link: "/marketplace/audios", label: "marketplace.audios"},
    {link: "/marketplace/profiles", label: "marketplace.profiles"},
  ]


  getDeveloperUser(profile: Profile){
    const account = this.iamStore.getAccountById(profile.accountId)()!;
    return  this.iamStore.getUserById(account.userId);

  }


}
