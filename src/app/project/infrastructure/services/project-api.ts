import {BaseApi} from '../../../shared/infrastructure/base-api';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ArtsApiEndpoint} from './arts-api-endpoint';
import {GamesApiEndpoint} from './games-api-endpoint';
import {AudiosApiEndpoint} from './audios-api-endpoint';
import {Art} from '../../domain/model/art.entity';
import {Game} from '../../domain/model/game.entity';
import {Audio} from '../../domain/model/audio.entity';

@Injectable({providedIn: 'root'})
export class ProjectApi extends BaseApi {
  private readonly artsEndPoint: ArtsApiEndpoint;
  private readonly gamesEndPoint: GamesApiEndpoint;
  private readonly audiosEndPoint: AudiosApiEndpoint;

  constructor(http: HttpClient) {
    super();
    this.artsEndPoint = new ArtsApiEndpoint(http);
    this.gamesEndPoint = new GamesApiEndpoint(http);
    this.audiosEndPoint = new AudiosApiEndpoint(http);
  }

  getGames():Observable<Game[]>{
    return this.gamesEndPoint.getAll();
  }
  getGame(id:number){
    return this.gamesEndPoint.getById(id);
  }
  createGame(game:Game):Observable<Game>{
    return this.gamesEndPoint.create(game);
  }
  updateGame(game:Game):Observable<Game>{
    return this.gamesEndPoint.update(game,game.id);
  }
  deleteGame(id:number):Observable<void>{
    return this.gamesEndPoint.delete(id);
  }

  getArts():Observable<Art[]>{
    return this.artsEndPoint.getAll();
  }
  getArt(id:number){
    return this.artsEndPoint.getById(id);
  }
  createArt(art:Art):Observable<Art>{
    return this.artsEndPoint.create(art);
  }
  updateArt(art:Art):Observable<Art>{
    return this.artsEndPoint.update(art,art.id);
  }
  deleteArt(id:number):Observable<void>{
    return this.artsEndPoint.delete(id);
  }

  getAudios():Observable<Audio[]>{
    return this.audiosEndPoint.getAll();
  }
  getAudio(id:number){
    return this.audiosEndPoint.getById(id);
  }
  createAudio(audio:Audio):Observable<Audio>{
    return this.audiosEndPoint.create(audio);
  }
  updateAudio(audio:Audio):Observable<Audio>{
    return this.audiosEndPoint.update(audio,audio.id);
  }
  deleteAudio(id:number):Observable<void>{
    return this.audiosEndPoint.delete(id);
  }
}
