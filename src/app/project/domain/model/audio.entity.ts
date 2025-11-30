import {AudioCategory} from "./audio-category"
import {Project} from './project.entity';

export class Audio extends Project{
  constructor(audio:{
    id:number,
    authorId: number,
    name:string,
    description:string,
    rating:number,
    creationDate:Date,
    image:string,
    audioUrl:string,
    format:string,
    category: AudioCategory
  }) {

    super({
      id: audio.id,
      authorId:audio.authorId,
      name: audio.name,
      description: audio.description,
      rating: audio.rating,
      creationDate: audio.creationDate,
      image: audio.image
    });
    this._audioUrl=audio.audioUrl;
    this._format=audio.format;
    this._category=audio.category;
  }

  private _audioUrl:string;
  private _format:string;
  private _category:AudioCategory;

  get audioUrl():string{
    return this._audioUrl;
  }
  set audioUrl(value:string){
    this._audioUrl=value;
  }

  get format():string{
    return this._format;
  }
  set format(value:string){
    this._format=value;
  }

  get category():AudioCategory{
    return this._category;
  }
  set category(value:AudioCategory){
    this._category=value;
  }

}
