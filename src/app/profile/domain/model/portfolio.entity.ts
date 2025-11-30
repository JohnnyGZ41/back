import {BaseEntity} from '../../../shared/domain/model/base-entity';

export class Portfolio implements BaseEntity{
  private readonly _id: number;
  private readonly _creationDate: Date;
  private _gameIds: number[];
  private _audioIds: number[];
  private _artIds: number[];


  constructor(portfolio: {
    id: number,
    creationDate: Date,
    gameIds: number[],
    audioIds: number[],
    artIds: number[]
  }){
    this._id = portfolio.id;
    this._creationDate = portfolio.creationDate;
    this._gameIds = portfolio.gameIds;
    this._audioIds = portfolio.audioIds;
    this._artIds = portfolio.artIds;
  }

  get id(){return this._id;}
  get creationDate(){return this._creationDate;}
  get gameIds(){return this._gameIds;}
  get audioIds(){return this._audioIds;}
  get artIds(){return this._artIds;}

  set gameIds(value){this._gameIds = value;}
  set audioIds(value){this._audioIds = value;}
  set artIds(value){this._artIds = value;}
}
