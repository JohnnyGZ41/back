
export class Review {
  constructor(review:{
    id:number,
    userId:number,
    projectId:number,
    comment:string,
    rating:number,
    creationDate:string
  }) {
    this._id = review.id;
    this._userId = review.userId;
    this._projectId = review.projectId;
    this._comment=review.comment;
    this._rating=review.rating;
    this._creationDate=review.creationDate;
  }

  private readonly _id:number;
  private readonly _userId:number;
  private readonly _projectId:number;
  private readonly _comment:string;
  private readonly _rating:number;
  private readonly _creationDate:string;

  get id():number{
    return this._id;
  }
  get userId():number{
    return this._userId;
  }
  get projectId():number{
    return this._projectId;
  }
  get comment():string{
    return this._comment;
  }
  get rating():number{
    return this._rating;
  }
  get creationDate():string{
    return this._creationDate;
  }
}
