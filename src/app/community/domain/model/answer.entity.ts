import {BaseEntity} from '../../../shared/domain/model/base-entity';

export class Answer implements BaseEntity{
  private readonly _id: number;
  private readonly _userId: number;
  private readonly _publicationId: number;
  private _comment: string;
  private readonly _creationDate: Date;

  constructor(answer:{
    id: number,
    userId: number,
    publicationId: number,
    comment: string,
    creationDate: Date,
  }){
    this._id = answer.id;
    this._userId = answer.userId;
    this._publicationId = answer.publicationId;
    this._comment = answer.comment;
    this._creationDate = answer.creationDate;
  }

  get id(){return  this._id; }
  get userId(){return  this._userId; }
  get publicationId(){return  this._publicationId; }
  get comment(){return  this._comment; }
  get creationDate(){return  this._creationDate; }

  set comment(value:string){ this._comment = value; }
}
