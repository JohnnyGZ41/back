import {BaseEntity} from '../../../shared/domain/model/base-entity';

export class ShoppingCart implements BaseEntity {
  private readonly _id: number;
  private readonly _profileId: number;
  private _gameIds: number[];
  private readonly _creationDate: Date;
  private _price: number;

  constructor(shoppingCart:{
    id: number,
    profileId: number,
    gameIds: number[],
    creationDate: Date,
    price: number,
  }) {
    this._id = shoppingCart.id;
    this._profileId = shoppingCart.profileId;
    this._gameIds = shoppingCart.gameIds;
    this._creationDate = shoppingCart.creationDate;
    this._price = shoppingCart.price;
  }

  get id(){return this._id;}
  get profileId(){return this._profileId;}
  get gameIds(){return this._gameIds;}
  get creationDate(){return this._creationDate;}
  get price(){return this._price;}

  set gameIds(value: number[]){this._gameIds = value;}
  set price(value: number){this._price = value;}
}
