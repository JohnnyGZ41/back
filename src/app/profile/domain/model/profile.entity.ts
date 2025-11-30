import {BaseEntity} from '../../../shared/domain/model/base-entity';

export class Profile implements BaseEntity {

  private readonly _id: number;
  private _description: string;
  private _creationDate: Date;
  private _image: string;
  private _accountId: number;
  private _portfolioId: number | null;
  private _groupProjectIds: number[] | null;

  constructor(profile: {
    id: number;
    description: string;
    creationDate: Date;
    image: string;
    accountId: number;
    portfolioId: number | null;
    groupProjectIds: number[] | null;
  }) {
    this._id = profile.id;
    this._description = profile.description;
    this._creationDate = profile.creationDate;
    this._image = profile.image;
    this._accountId = profile.accountId;
    this._portfolioId = profile.portfolioId;
    this._groupProjectIds = profile.groupProjectIds;
  }

  get id(){return this._id}
  get description(){return this._description}
  get creationDate(){return this._creationDate}
  get image(){return this._image}
  get accountId(){return this._accountId}
  get portfolioId(){return this._portfolioId}
  get groupProjectIds(){return this._groupProjectIds}

  set description(value: string){this._description = value;}
  set image(value: string){this._image = value;}
}
