import {Component, computed, inject} from '@angular/core';
import {CommunityStore} from '../../../application/community.store';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {PublicationItem} from '../../components/publication-item/publication-item';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {TranslatePipe} from '@ngx-translate/core';
import {IamStore} from '../../../../iam/application/iam.store';

@Component({
  selector: 'app-forum',
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatButton,
    PublicationItem,
    TranslatePipe
  ],
  templateUrl: './forum.html',
  styleUrl: './forum.css',
})
export class Forum {
  readonly communityStore = inject(CommunityStore);
  readonly iamStore = inject(IamStore);

  publications = computed(() => this.communityStore.publications());
  protected router = inject(Router);


  newPublication(){
    if(this.iamStore.currentAccount)
      this.router.navigate(['/community/publication/new']).then();
    else
      this.router.navigate(['/log-in']).then();
  }


}
