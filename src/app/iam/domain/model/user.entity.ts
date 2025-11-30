import {BaseEntity} from '../../../shared/domain/model/base-entity';

export class User implements BaseEntity {
  private readonly _id: number;
  private _name: string;
  private _phoneNumber: string;

  constructor(user:{ id: number; name: string; phoneNumber: string;}) {
    this._id = user.id;
    this._name = user.name;
    this._phoneNumber = user.phoneNumber;
  }

  get id(){return this._id}
  get name(){return this._name}
  get phoneNumber(){return this._phoneNumber}

  set name(value:string){ this._name = value; }
  set phoneNumber(value:string){ this._phoneNumber = value; }
}
