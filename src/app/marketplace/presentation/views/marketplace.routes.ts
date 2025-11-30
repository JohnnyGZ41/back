
import {Routes} from '@angular/router';

const home = () => import('./home-view/home-view').then(m=>m.HomeView);

const games = () => import('./games-view/games-view').then(m=>m.GamesView);
const audios = () => import('./audios-view/audios-view').then(m=>m.AudiosView);
const arts = () => import('./arts-view/arts-view').then(m=>m.ArtsView);
const profiles = () => import('./profiles-view/profiles-view').then(m=>m.ProfilesView);
export const marketplaceRoutes: Routes = [
  { path: 'home', loadComponent: home},
  { path: 'games', loadComponent: games},
  { path: 'audios', loadComponent: audios},
  { path: 'arts', loadComponent: arts},
  { path: 'profiles', loadComponent: profiles},
]


