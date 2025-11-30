import {Component, computed, inject, signal} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {Project} from '../../../../project/application/project.store';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-games-view',
  imports: [
    DatePipe,
    RouterLink,
    RouterLinkActive,
    TranslatePipe
  ],
  templateUrl: './games-view.html',
  styleUrl: './games-view.css',
})
export class GamesView {
  private projectStore = inject(Project);
  games = this.projectStore.games

  bestRatedGames = computed(() =>
    [...this.games()].sort((a, b) => b.rating - a.rating)
  );

  trendingGames = computed(() =>
    this.bestRatedGames()
  );

  newGames = computed(() => {
    return [...this.games()].sort((a, b) =>
      new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    );
  });

  marketplaceOptions = [
    {link: "/marketplace/games", label: "marketplace.games"},
    {link: "/marketplace/arts", label: "marketplace.arts"},
    {link: "/marketplace/audios", label: "marketplace.audios"},
    {link: "/marketplace/profiles", label: "marketplace.profiles"},
  ]

  searchTerm = signal('');

  filteredGames = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.games();

    return this.games().filter(game =>
      game.name.toLowerCase().includes(term)
    );
  });

  onSearch() {
    console.log('Buscando:', this.searchTerm());
  }

}
