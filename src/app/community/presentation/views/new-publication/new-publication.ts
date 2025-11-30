import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CommunityStore} from '../../../application/community.store';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatLabel} from '@angular/material/form-field';
import {TranslatePipe} from '@ngx-translate/core';
import {Publication} from '../../../domain/model/publication.entity';
import {IamStore} from '../../../../iam/application/iam.store';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-new-publication',
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    TranslatePipe,
    MatInput
  ],
  templateUrl: './new-publication.html',
  styleUrl: './new-publication.css',
})
export class NewPublication {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private communityStore = inject(CommunityStore);
  private iamStore = inject(IamStore);

  preview: string | ArrayBuffer | null = null;

  form = this.fb.group({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    comment: new FormControl<string>('', { nonNullable: false }),
    image: new FormControl<string>('', { nonNullable: false })
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.form.patchValue({ image: reader.result as string }); // Base64
        this.preview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  submit() {

    if(!this.form.valid) return;

    const publication = new Publication({
      id: this.communityStore.publicationCount() + 1,
      userId: this.iamStore.currentAccount!.userId,
      title: this.form.value.title!,
      comment: this.form.value.comment? this.form.value.comment : null,
      image: this.form.value.image? this.form.value.image : null,
      creationDate: new Date()
    });
    this.communityStore.addPublication(publication);
    this.router.navigate(['community/forum']).then();
  }

  cancel(){
    this.router.navigate(['community/forum']).then();
  }

}
