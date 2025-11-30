import {Component, computed, inject, input} from '@angular/core';
import {Review} from '../../../domain/model/review.entity';
import {IamStore} from '../../../../iam/application/iam.store';
import {DatePipe, NgForOf} from '@angular/common';
import {MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardAvatar} from '@angular/material/card';
import {TranslatePipe} from '@ngx-translate/core';
import {ProfileStore} from '../../../../profile/application/profile.store';
@Component({
  selector: 'app-review-item',
  standalone: true,
  imports: [
    MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardAvatar,
    DatePipe,
    NgForOf,
    TranslatePipe
  ],
  templateUrl: './review-item.html',
  styleUrl: './review-item.css',
})
export class ReviewItem {
  review = input.required<Review>();
  readonly iamStore = inject(IamStore);
  readonly profileStore = inject(ProfileStore);
  reviewUser = computed(() =>
    this.iamStore.getUserById(this.review().userId)()
  );

  reviewUserProfile = computed(() => {
    const user = this.reviewUser();
    if (!user) return undefined;
    const account = this.iamStore.accounts().find(a => a.userId === user.id);
    return account ? this.profileStore.profiles().find(p => p.accountId === account.id) : undefined;
  });
}
