import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileStore} from '../../../application/profile.store';
import {IamStore} from '../../../../iam/application/iam.store';
import {MatButton} from '@angular/material/button';
import {Project} from '../../../../project/application/project.store';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {Profile} from '../../../domain/model/profile.entity';
import {User} from '../../../../iam/domain/model/user.entity';

@Component({
  selector: 'app-profile-view',
  imports: [
    MatButton,
    FormsModule,
    MatInput,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './profile-view.html',
  styleUrl: './profile-view.css',
})
export class ProfileView {

  private route = inject(ActivatedRoute);
  protected router = inject(Router);
  readonly profileStore = inject(ProfileStore);
  readonly iamStore = inject(IamStore);
  readonly projectStore = inject(Project);


  readonly profileId = signal<number | null>(null);

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'] ? +params['id'] : null;
      this.profileId.set(id);
    });
  }

  currentProfile = computed(() =>
    this.profileStore.getProfileById(this.profileId()!)()
  );

  profileAccount = computed(() =>
    this.iamStore.accounts().find(a => a.id === this.currentProfile()?.accountId)
  );

  profileUser = computed(() =>
    this.iamStore.getUserById(this.profileAccount()?.userId ?? 0)()
  );

  profilePortfolio = computed(() =>
    this.profileStore.getPortfolioById(this.currentProfile()?.portfolioId ?? 0)()
  );

  portfolioGames = computed(() => {
    const portfolio = this.profilePortfolio();
    if (!portfolio?.gameIds) return [];
    return this.projectStore.games().filter(g => portfolio.gameIds.includes(g.id));
  });

  portfolioAudios = computed(() => {
    const portfolio = this.profilePortfolio();
    if (!portfolio?.audioIds) return [];
    return this.projectStore.audios().filter(a => portfolio.audioIds.includes(a.id));
  });

  portfolioArts = computed(() => {
    const portfolio = this.profilePortfolio();
    if (!portfolio?.artIds) return [];
    return this.projectStore.arts().filter(a => portfolio.artIds.includes(a.id));
  });

  isEditing = false;
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  enableEdit(){
    this.isEditing = !this.isEditing;
  }

  submit(){

    if(!this.form.valid) return;

    const updatedProfile = new Profile({
      id: this.currentProfile()?.id!,
      description: this.form.value.description!,
      image: this.currentProfile()?.image!,
      creationDate: this.currentProfile()?.creationDate!,
      accountId: this.currentProfile()?.accountId!,
      portfolioId: this.currentProfile()?.accountId!,
      groupProjectIds: this.currentProfile()?.groupProjectIds!
    });
    this.profileStore.updateProfile(updatedProfile);

    const updatedUser = new User({
      id: this.profileUser()?.id!,
      name: this.form.value.name!,
      phoneNumber: `+51 ${this.form.value.phone!}`
    });
    this.iamStore.updateUser(updatedUser);

    this.isEditing = false;
  }

  cancel(){
    this.isEditing = false;
  }


  selectedTab: 'portfolio' | 'games' | 'audios' | 'arts' = 'games';

  selectTab(tab: 'portfolio' | 'games' | 'audios' | 'arts') {
    this.selectedTab = tab;
  }

  addProject(){
    this.router.navigate([`/project/new/${this.profileAccount()?.id}`]).then();
  }
}
