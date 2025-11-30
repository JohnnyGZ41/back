import {BaseEntity} from '../../../shared/domain/model/base-entity';

export class GroupProject implements BaseEntity{
  private readonly _id: number;
  private _memberIds: number[];
  private readonly _gameId: number;

  constructor(groupProject:{
    id: number,
    memberIds: number[],
    gameId: number,
  }){
    this._id = groupProject.id;
    this._memberIds = groupProject.memberIds;
    this._gameId = groupProject.gameId;
  }

  get id(){return this._id;}
  get memberIds(){return this._memberIds;}
  get gameId(){return this._gameId;}

  set memberIds(value){this._memberIds = value;}
}
