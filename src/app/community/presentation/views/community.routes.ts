
import {Routes} from '@angular/router';
const forum = () => import('./forum/forum').then(m=>m.Forum);

const newPublication = () => import('./new-publication/new-publication').then(m=>m.NewPublication);

const publicationVew = () => import('./publication-view/publication-view').then(m=>m.PublicationView);

export const communityRoutes: Routes = [
  { path: 'forum', loadComponent: forum},
  { path: 'publication/new', loadComponent: newPublication},
  { path: 'publication/:id', loadComponent: publicationVew},
]


