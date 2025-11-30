import {AudioCategory} from '../../domain/model/audio-category';
import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface AudioResource extends BaseResource{
  id:number,
  authorId: number,
  name:string,
  description:string,
  rating:number,
  creationDate:Date,
  audioUrl:string,
  format:string,
  category: AudioCategory,
  image: string,
}
