import {BaseApi} from '../../../shared/infrastructure/base-api';
import {Injectable} from '@angular/core';
import {UsersApiEndpoint} from './users-api-endpoint';
import {AccountsApiEndpoint} from './accounts-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../domain/model/user.entity';
import {Account} from '../../domain/model/account.entity';
import {SignUpApiEndpoint} from '../sign-up-endpoint';
import {SignInApiEndpoint} from '../sign-in-endpoint';
import {SignUpAssembler} from '../sign-up-assembler';
import {SignInAssembler} from '../sign-in-assembler';
import {SignUpCommand} from '../../domain/model/sign-up.command';
import {SignUpResource} from '../sign-up-response';
import {SignInResource} from '../sign-in-response';
import {SignInCommand} from '../../domain/model/sign-in.command';

@Injectable({providedIn: 'root'})
export class IamApi extends BaseApi {
  private readonly usersEndpoint: UsersApiEndpoint;
  private readonly accountsEndpoint: AccountsApiEndpoint;

  private readonly signUpEndpoint: SignUpApiEndpoint;
  private readonly signInEndpoint: SignInApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.usersEndpoint = new UsersApiEndpoint(http);
    this.accountsEndpoint = new AccountsApiEndpoint(http);

    this.signUpEndpoint = new SignUpApiEndpoint(http, new SignUpAssembler());
    this.signInEndpoint = new SignInApiEndpoint(http, new SignInAssembler());

  }

  getUsers(): Observable<User[]>{
    return this.usersEndpoint.getAll();
  }
  getUser(id: number){
    return this.usersEndpoint.getById(id);
  }
  createUser(user: User): Observable<User>{
    return this.usersEndpoint.create(user);
  }
  updateUser(user: User): Observable<User>{
    return this.usersEndpoint.update(user, user.id);
  }
  deleteUser(id: number): Observable<void>{
    return this.usersEndpoint.delete(id);
  }

  getAccounts(): Observable<Account[]>{
    return this.accountsEndpoint.getAll();
  }
  getAccount(id: number): Observable<Account>{
    return this.accountsEndpoint.getById(id);
  }
  createAccount(account: Account): Observable<Account>{
    return this.accountsEndpoint.create(account);
  }
  updateAccount(account: Account): Observable<Account>{
    return this.accountsEndpoint.update(account, account.id);
  }
  deleteAccount(id: number): Observable<void>{
    return this.accountsEndpoint.delete(id);
  }


  /**
   * Signs up a new user.
   * @param signUpCommand The sign-up command containing user details.
   * @returns An Observable of the sign-up response.
   */
  signUp(signUpCommand: SignUpCommand): Observable<SignUpResource>  {
    return this.signUpEndpoint.signUp(signUpCommand);
  }

  /**
   * Signs in an existing user.
   * @param signInCommand The sign-in command containing credentials.
   * @returns An Observable of the sign-in response.
   */
  signIn(signInCommand: SignInCommand): Observable<SignInResource> {
    return this.signInEndpoint.signIn(signInCommand);
  }



}
