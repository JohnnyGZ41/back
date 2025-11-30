import {computed, Injectable, Signal, signal} from '@angular/core';
import {Observable, retry} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Game} from '../domain/model/game.entity';
import {Art} from '../domain/model/art.entity';
import {Audio} from '../domain/model/audio.entity';
import {ProjectApi} from '../infrastructure/services/project-api';


@Injectable({ providedIn: 'root' })
export class Project {
  private readonly gamesSignal = signal<Game[]>([]);
  readonly games=this.gamesSignal.asReadonly();

  private readonly audiosSignal = signal<Audio[]>([]);
  readonly audios=this.audiosSignal.asReadonly();

  private readonly artsSignal = signal<Art[]>([]);
  readonly arts=this.artsSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  private _currentGame: Game | undefined = undefined;
  private _currentAudio: Audio | undefined = undefined;
  private _currentArt: Art | undefined = undefined;

  constructor(private projectApi: ProjectApi) {
    this.loadGames();
    this.loadAudios();
    this.loadArts();
  }

  get currentGame() :Game | undefined{
    return this._currentGame;
  }
  get currentAudio():Audio | undefined{
    return this._currentAudio;
  }
  get currentArt():Art | undefined{
    return this._currentArt;
  }

  set currentGame(value:Game){
    this._currentGame = value;
  }
  set currentAudio(value:Audio){
    this._currentAudio = value;
  }
  set currentArt(value:Art){
    this._currentArt = value;
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? '${fallback}: Not found' : error.message;
    }
    return fallback;
  }

  public loadGames():void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.projectApi.getGames().pipe(takeUntilDestroyed()).subscribe({
      next: games=>{
        console.log(games);
        this.gamesSignal.set(games);
        this.loadingSignal.set(false);
      },
      error:err => {
        this.errorSignal.set(this.formatError(err,'Failed to load games'));
        this.loadingSignal.set(false);
      }
    });
  }
  private loadAudios():void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.projectApi.getAudios().pipe(takeUntilDestroyed()).subscribe({
      next: audios=>{
        console.log(audios);
        this.audiosSignal.set(audios);
        this.loadingSignal.set(false);
      },
      error:err => {
        this.errorSignal.set(this.formatError(err,'Failed to load audios'));
        this.loadingSignal.set(false);
      }
    });
  }
  private loadArts():void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.projectApi.getArts().pipe(takeUntilDestroyed()).subscribe({
      next: arts=>{
        console.log(arts);
        this.artsSignal.set(arts);
        this.loadingSignal.set(false);
      },
      error:err => {
        this.errorSignal.set(this.formatError(err,'Failed to load arts'));
        this.loadingSignal.set(false);
      }
    });
  }
  //Game values
  getGameById(id:number):Signal<Game | undefined>{
    return computed(()=>id? this.games().find(g=>g.id === id):undefined);
  }

  addGame(game:Game):void{
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.projectApi.createGame(game).pipe(retry(2)).subscribe({
      next: createdGame=>{
        this.gamesSignal.update(games=>[...games,createdGame]);
        this.loadingSignal.set(false);
      },
      error:err => {
        this.errorSignal.set(this.formatError(err,'Failed to load games'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateGame(updatedGame:Game):void{
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.projectApi.updateGame(updatedGame).pipe(retry(2)).subscribe({
      next: game=>{
        this.gamesSignal.update(games=>games.map(g=>g.id=== game.id? game:g));
        this.loadingSignal.set(false);
      },
      error:err => {
        this.errorSignal.set(this.formatError(err,'Failed to update game'));
        this.loadingSignal.set(false);
      }
    });
  }
  deleteGame(id:number):void{
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.projectApi.deleteGame(id).pipe(retry(2)).subscribe({
      next:()=>{
        this.gamesSignal.update(games=>games.filter((g=>g.id!==id)));
        this.loadingSignal.set(false);
      },
      error:err => {
        this.errorSignal.set(this.formatError(err,'Failed to delete game'));
        this.loadingSignal.set(false);
      }
    });
  }
  //Art values
  getArtById(id:number):Signal<Art | undefined>{
    return computed(()=>id? this.arts().find(a=>a.id===id):undefined);
  };


  addArt(art:Art):void{
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.projectApi.createArt(art).pipe(retry(2)).subscribe({
      next: createdArt=>{
        this.artsSignal.update(arts=>[...arts,createdArt]);
        this.loadingSignal.set(false);
      },
      error:err => {
        this.errorSignal.set(this.formatError(err,'Failed to create art'));
        this.loadingSignal.set(false);
      }
    });
  }
  updateArt(updatedArt:Art):void{
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.projectApi.updateArt(updatedArt).pipe(retry(2)).subscribe({
      next: art=>{
        this.artsSignal.update(arts=>arts.map(a=>a.id===art.id? art:a));
        this.loadingSignal.set(false);
      },
      error:err => {
        this.errorSignal.set(this.formatError(err,'Failed to update art'));
        this.loadingSignal.set(false);
      }
    });
  }
  deleteArt(id:number):void{
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.projectApi.deleteArt(id).pipe(retry(2)).subscribe({
      next: ()=>{
        this.artsSignal.update(arts=> arts.filter((a=>a.id!==id)));
        this.loadingSignal.set(false);
      },
      error:err => {
        this.errorSignal.set(this.formatError(err,'Failed to delete art'));
        this.loadingSignal.set(false);
      }
    });
  }

  //Audio values

  getAudioById(id:number):Signal<Audio | undefined>{
    return computed(()=>id? this.audios().find(au=>au.id===id):undefined);
  };

  addAudio(audio:Audio):void{
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.projectApi.createAudio(audio).pipe(retry(2)).subscribe({
      next: createdAudio=>{
        this.audiosSignal.update(audios=>[...audios,createdAudio]);
        this.loadingSignal.set(false);
      },
      error:err => {
        this.errorSignal.set(this.formatError(err,'Failed to create audio'));
        this.loadingSignal.set(false);
      }
    });
  }
  updateAudio(updatedAudio:Audio):void{
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.projectApi.updateAudio(updatedAudio).pipe(retry(2)).subscribe({
      next: audio=>{
        this.audiosSignal.update(audios=>audios.map(au=>au.id===audio.id?audio:au));
        this.loadingSignal.set(false);
      },
      error:err => {
        this.errorSignal.set(this.formatError(err,'Failed to update audio'));
        this.loadingSignal.set(false);
      }
    });
  }
  deleteAudio(id:number):void{
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.projectApi.deleteAudio(id).pipe(retry(2)).subscribe({
      next: ()=>{
        this.audiosSignal.update(audios=>audios.filter((au=>au.id!==id)));
        this.loadingSignal.set(false);
      },
      error:err => {
        this.errorSignal.set(this.formatError(err,'Failed to delete audio'));
        this.loadingSignal.set(false);
      }
    })
  }
}
