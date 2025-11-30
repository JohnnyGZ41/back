import {Component, computed, inject, Signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommunityStore} from '../../../application/community.store';
import {Publication} from '../../../domain/model/publication.entity';
import {DatePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardSubtitle, MatCardTitle
} from '@angular/material/card';
import {TranslatePipe} from '@ngx-translate/core';
import {IamStore} from '../../../../iam/application/iam.store';
import {ProfileStore} from '../../../../profile/application/profile.store';
import {User} from '../../../../iam/domain/model/user.entity';
import {Account} from '../../../../iam/domain/model/account.entity';
import {Profile} from '../../../../profile/domain/model/profile.entity';
import {Answer} from '../../../domain/model/answer.entity';
import {AnswerItem} from '../../components/answer-item/answer-item';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-publication-view',
  imports: [
    DatePipe,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    TranslatePipe,
    AnswerItem,
    FormsModule
  ],
  templateUrl: './publication-view.html',
  styleUrl: './publication-view.css',
})
export class PublicationView {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  publicationId: number | null = null;

  readonly communityStore = inject(CommunityStore)
  readonly iamStore = inject(IamStore);
  readonly profileStore = inject(ProfileStore);

  currentPublication: Publication | undefined;
  publicationUser: User | undefined;
  publicationAccount: Account | undefined;
  publicationProfile: Profile | undefined;

  answers : Answer[] | undefined;


  constructor() {
    this.route.params.subscribe(params => {
      this.publicationId = params['id'] ? +params['id'] : null;
    })

    this.currentPublication = this.communityStore.getPublicationById(this.publicationId!)();

    this.publicationUser = this.iamStore.getUserById(this.currentPublication!.userId)();

    this.publicationAccount = this.iamStore.accounts().find(a => a.userId === this.publicationUser?.id)

    this.publicationProfile = this.profileStore.profiles().find(p => p.accountId === this.publicationAccount?.id)

    this.answers = this.communityStore.answers().filter(a => a.publicationId === this.currentPublication?.id);
  }


  newComment: string = '';
  showButtons = false;

  cancelComment() {
    this.newComment = '';
    this.showButtons = false;
  }

  submitComment() {
    if (!this.newComment.trim()) return;

    if (!this.iamStore.currentAccount)
      this.router.navigate(['/log-in']).then();

    const authorAccount =this.iamStore.currentAccount;
    const authorUser = this.iamStore.getUserById(authorAccount!.userId);

    const answer = new Answer({
      id: this.communityStore.answerCount() + 1,
      userId: authorUser()!.id,
      publicationId: this.publicationId!,
      comment: this.newComment,
      creationDate: new Date()
    })
    this.communityStore.addAnswer(answer);

    this.newComment = '';

    this.router.navigate([`/community/forum`]).then();
  }

  onBlur(event: FocusEvent) {
    const target = event.relatedTarget as HTMLElement;
    if (target && target.closest('.comment-actions')) return;
    if (!this.newComment.trim()) this.showButtons = false;
  }



}
