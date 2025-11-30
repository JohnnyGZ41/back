import {BaseResource} from '../../../shared/infrastructure/base-resource';

export interface PublicationResource extends BaseResource {
  id:number,
  userId:number,
  title: string,
  comment:string | null,
  image:string | null,
  creationDate:Date
}
