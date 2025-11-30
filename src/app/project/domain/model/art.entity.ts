import {ArtCategory} from "./art-category"
import {Project} from './project.entity';

export class Art extends Project {

  constructor(art:{
    id: number,
    authorId: number,
    name: string,
    description: string,
    rating: number,
    creationDate: Date,
    image: string,
    category:ArtCategory
  }) {

    super({
      id: art.id,
      authorId: art.authorId,
      name: art.name,
      description: art.description,
      rating: art.rating,
      creationDate: art.creationDate,
      image: art.image
    });

    this._category=art.category;
  }

  private _category: ArtCategory;


  get category():ArtCategory{
    return this._category;
  }
  set category(_category:ArtCategory){
    this._category = _category;
  }


}
