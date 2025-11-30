import {GameCategory} from './game-category';
import {Project} from './project.entity';

export class Game extends Project{

  constructor(game:{
    id:number,
    authorId: number,
    name:string,
    description:string,
    rating:number,
    creationDate:Date,
    price:number,
    category:GameCategory,
    image:string
  }) {

    super({
      id: game.id,
      authorId:game.authorId,
      name: game.name,
      description: game.description,
      rating: game.rating,
      creationDate: game.creationDate,
      image: game.image
    });

    this._price=game.price;
    this._category=game.category;
  }


  private _price:number;
  private _category:GameCategory;

  get price():number{
    return this._price;
  }
  set price(value:number){
    this._price = value;
  }

  get category():GameCategory{
    return this._category;
  }
  set category(value:GameCategory){
    this._category = value;
  }


}
