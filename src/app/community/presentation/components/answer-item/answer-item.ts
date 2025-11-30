import {Component, computed, inject, input} from '@angular/core';
import {Answer} from '../../../domain/model/answer.entity';
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

@Component({
  selector: 'app-answer-item',
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
    TranslatePipe
  ],
  templateUrl: './answer-item.html',
  styleUrl: './answer-item.css',
})
export class AnswerItem {

  answer = input.required<Answer>();

  readonly iamStore = inject(IamStore);
  readonly profileStore = inject(ProfileStore);

  answerUser = computed(() =>
    this.iamStore.getUserById(this.answer().userId)());

  answerAccount = computed(() =>
    this.iamStore.accounts().find(a => a.userId === this.answerUser()?.id));

  answerProfile = computed(()=>
    this.profileStore.profiles().find(p => p.accountId === this.answerAccount()?.id));

}
