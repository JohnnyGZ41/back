import {Component, computed, inject, input} from '@angular/core';
import {IamStore} from '../../../../iam/application/iam.store';
import {ProfileStore} from '../../../../profile/application/profile.store';
import {Publication} from '../../../domain/model/publication.entity';
import {Router} from '@angular/router';
import {
  MatCardModule, MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';

import {MatButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-publication-item',
  imports: [
    MatCardModule,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatIconModule,
    TranslatePipe,
    DatePipe
  ],
  templateUrl: './publication-item.html',
  styleUrl: './publication-item.css',
})
export class PublicationItem {

  protected router = inject(Router);

  publication = input.required<Publication>();
  readonly iamStore = inject(IamStore);
  readonly profileStore = inject(ProfileStore);

  publicationUser = computed(() =>
    this.iamStore.getUserById(this.publication().userId)());

  publicationAccount = computed(() =>
    this.iamStore.accounts().find(a => a.userId === this.publicationUser()?.id));

  publicationProfile = computed(()=>
    this.profileStore.profiles().find(p => p.accountId === this.publicationAccount()?.id));


  selectPublication(id: number) {
    this.router.navigate(['community/publication', id]).then();
  }


}
