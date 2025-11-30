import {BaseEntity} from '../../../shared/domain/model/base-entity';
import {User} from './user.entity';
import {AccountType} from './account-type';

export class Account implements BaseEntity {
  private readonly _id: number;
  private readonly _userId: number;
  private _email: string;
  private _password: string;
  private _isActive: boolean;
  private _role: AccountType

  constructor(account:{
    id:number,
    userId:number,
    email:string,
    password:string,
    isActive:boolean,
    role:AccountType
  }) {
    this._id = account.id;
    this._userId = account.userId;
    this._email = account.email;
    this._password = account.password;
    this._isActive = account.isActive;
    this._role = account.role;
  }

  get id(){return this._id;}
  get userId(){return this._userId;}
  get email(){return this._email;}
  get password(){return this._password;}
  get isActive(){return this._isActive;}
  get role(){return this._role;}

  set email(email:string){this._email = email;}
  set password(email:string){this._password = email;}
  set isActive(isActive:boolean){this._isActive = isActive;}
  set role(role:AccountType){this._role = role;}
}
