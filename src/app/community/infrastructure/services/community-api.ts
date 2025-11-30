import {BaseApi} from '../../../shared/infrastructure/base-api';
import {Injectable} from '@angular/core';
import {PublicationsApiEndpoint} from './publications-api-endpoint';
import {AnswersApiEndpoint} from './answers-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Publication} from '../../domain/model/publication.entity';
import {Answer} from '../../domain/model/answer.entity';

@Injectable({providedIn: 'root'})
export class CommunityApi extends BaseApi {
  private publicationsEndpoint: PublicationsApiEndpoint;
  private answersEndpoint: AnswersApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.publicationsEndpoint = new PublicationsApiEndpoint(http);
    this.answersEndpoint = new AnswersApiEndpoint(http);
  }

  getPublications(): Observable<Publication[]>{
    return this.publicationsEndpoint.getAll()
  }
  getPublication(id: number): Observable<Publication>{
    return this.publicationsEndpoint.getById(id);
  }
  createPublication(publication: Publication): Observable<Publication>{
    return this.publicationsEndpoint.create(publication);
  }
  updatePublication(publication: Publication): Observable<Publication>{
    return this.publicationsEndpoint.update(publication, publication.id);
  }
  deletePublication(id: number): Observable<void>{
    return this.publicationsEndpoint.delete(id);
  }

  getAnswers(): Observable<Answer[]>{
    return this.answersEndpoint.getAll();
  }
  getAnswer(id: number): Observable<Answer>{
    return this.answersEndpoint.getById(id);
  }
  createAnswer(answer: Answer): Observable<Answer>{
    return this.answersEndpoint.create(answer);
  }
  updateAnswer(answer:Answer): Observable<Answer>{
    return this.answersEndpoint.update(answer, answer.id);
  }
  deleteAnswer(id: number): Observable<void>{
    return this.answersEndpoint.delete(id);
  }

}
