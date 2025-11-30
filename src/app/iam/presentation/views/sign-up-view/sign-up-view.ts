import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {IamStore} from '../../../application/iam.store';
import {User} from '../../../domain/model/user.entity';
import {Account} from '../../../domain/model/account.entity';
import {AccountType} from '../../../domain/model/account-type';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {MatInput} from '@angular/material/input';
import {Profile} from '../../../../profile/domain/model/profile.entity';
import {ProfileStore} from '../../../../profile/application/profile.store';
import {SignUpCommand} from '../../../domain/model/sign-up.command';

@Component({
  selector: 'app-sign-up-view',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    TranslatePipe,
    MatInput,
    MatInputModule
  ],
  templateUrl: './sign-up-view.html',
  styleUrl: './sign-up-view.css'
})
export class SignUpView {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private iamStore = inject(IamStore);
  private profileStore = inject(ProfileStore);

  form = this.fb.group({
    name: new FormControl<string>('',{ nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    passwordConfirmation: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    phoneNumber: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  }, { validators: [this.passwordsMatchValidator] });

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('passwordConfirmation')?.value;
    if (!password || !confirm) return null;
    return password === confirm ? null : { passwordsMismatch: true };
  }

  submit() {
    if(!this.form.valid) return;

    const user: User = new User({
      id: this.iamStore.userCount() + 1,
      name: this.form.value.name!,
      phoneNumber: this.form.value.phoneNumber!
    });

    const account = new Account({
      id: this.iamStore.accountCount() + 1,
      userId: user.id,
      email: this.form.value.email!,
      password: this.form.value.password!,
      isActive: true,
      role: AccountType.STANDARD
    });

    const profile = new Profile({
      id: this.profileStore.profileCount() +1,
      description: "",
      creationDate: new Date,
      image: "https://img.freepik.com/vector-gratis/circulo-azul-usuario-blanco_78370-4707.jpg?semt=ais_hybrid&w=740&q=80",
      accountId: account.id,
      portfolioId: null,
      groupProjectIds: null
    })

    this.iamStore.addUser(user);
    this.iamStore.addAccount(account);
    this.profileStore.addProfile(profile);



    const signUpCommand = new SignUpCommand({
      email: this.form.value.email!,
      password: this.form.value.password!,
      isActive: true,
      role: "STANDARD",
      name: this.form.value.name!,
      phoneNumber: this.form.value.phoneNumber!
    });
    this.iamStore.signUp(signUpCommand, this.router);



    this.router.navigate(['home']).then();
  }
}
