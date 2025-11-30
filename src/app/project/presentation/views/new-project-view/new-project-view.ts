import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Project} from '../../../application/project.store';
import {GameCategory} from '../../../domain/model/game-category';
import {AudioCategory} from '../../../domain/model/audio-category';
import {ArtCategory} from '../../../domain/model/art-category';
import {ProfileStore} from '../../../../profile/application/profile.store';
import {Game} from '../../../domain/model/game.entity';
import {Audio} from '../../../domain/model/audio.entity'
import {Art} from '../../../domain/model/art.entity'
import {IamStore} from '../../../../iam/application/iam.store';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-new-project-view',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './new-project-view.html',
  styleUrl: './new-project-view.css',
})
export class NewProjectView {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private projectStore = inject(Project);
  private profileStore = inject(ProfileStore);
  private iamStore = inject(IamStore);
  preview: string | ArrayBuffer | null = null;
  selectedType: 'game' | 'audio' | 'art' = 'game';

  gameCategories = Object.keys(GameCategory).filter(k => isNaN(Number(k)));
  audioCategories = Object.keys(AudioCategory).filter(k => isNaN(Number(k)));
  artCategories = Object.keys(ArtCategory).filter(k => isNaN(Number(k)));

  readonly accountId = signal<number | null>(null);

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'] ? +params['id'] : null;
      this.accountId.set(id);
    });
  }


  generalForm = this.fb.group({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    projectType: new FormControl<string>('game', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    image: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  gameForm = this.fb.group({
    price: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    gameCategory: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  audioForm = this.fb.group({
    audioUrl: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    format: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    audioCategory: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  artForm = this.fb.group({
    artCategory: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.generalForm.patchValue({ image: reader.result as string }); // Base64
        this.preview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submit() {

    if(!this.generalForm.valid) return;

    if(this.selectedType === 'game') {
      const game = new Game({
        id: this.projectStore.games().length +1,
        authorId: this.accountId()!,
        name: this.generalForm.value.name!,
        description: this.generalForm.value.description!,
        rating: 5,
        creationDate: new Date(),
        image: this.generalForm.value.image!,
        price: parseInt(this.gameForm.value.price!),
        category: GameCategory[this.gameForm.value.gameCategory as keyof typeof GameCategory],
      })
      this.projectStore.addGame(game);
    }
    else if (this.selectedType === 'audio') {
      const audio = new Audio({
        id: this.projectStore.audios().length +1,
        authorId: this.accountId()!,
        name: this.generalForm.value.name!,
        description: this.generalForm.value.description!,
        rating: 5,
        creationDate: new Date(),
        image: this.generalForm.value.image!,
        audioUrl: this.audioForm.value.audioUrl!,
        format: this.audioForm.value.format!,
        category: AudioCategory[this.audioForm.value.audioCategory as keyof typeof AudioCategory]
      })
      this.projectStore.addAudio(audio);
    }
    else if (this.selectedType === 'art') {
      const art = new Art({
        id: this.projectStore.audios().length +1,
        authorId: this.accountId()!,
        name: this.generalForm.value.name!,
        description: this.generalForm.value.description!,
        rating: 5,
        creationDate: new Date(),
        image: this.generalForm.value.image!,
        category: ArtCategory[this.artForm.value.artCategory as keyof typeof ArtCategory]
      })
      this.projectStore.addArt(art);
    }
    const profileId = this.profileStore.profiles().find(p => p.accountId === this.accountId())?.id!;
    this.router.navigate([`/profile/${profileId}`]).then();
  }

  cancel(){
    const profileId = this.profileStore.profiles().find(p => p.accountId === this.accountId())?.id!;
    this.router.navigate([`/profile/${profileId}`]).then();
  }

}
