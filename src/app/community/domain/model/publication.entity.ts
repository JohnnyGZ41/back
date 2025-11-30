import {BaseEntity} from '../../../shared/domain/model/base-entity';

export class Publication implements BaseEntity {
  private readonly _id: number;
  private readonly _userId: number;
  private readonly _title: string;
  private _comment: string | null;
  private _image: string | null;
  private readonly _creationDate: Date;

  constructor(publication:{
    id:number,
    userId:number,
    title:string,
    comment:string | null,
    image:string | null,
    creationDate:Date,
  }) {
    this._id = publication.id;
    this._userId = publication.userId;
    this._title = publication.title;
    this._comment = publication.comment;
    this._image = publication.image;
    this._creationDate = publication.creationDate;
  }

  get id(){return this._id;}
  get userId(){return this._userId;}
  get title(){return this._title;}
  get comment(): string | null {return this._comment;}
  get image(): string | null {return this._image;}
  get creationDate(){return this._creationDate;}

  set comment(value:string){this._comment = value;}
  set image(value:string){this._image = value;}
}
