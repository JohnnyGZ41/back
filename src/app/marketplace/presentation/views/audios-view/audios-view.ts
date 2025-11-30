import {Component, computed, inject, signal} from '@angular/core';
import {Project} from '../../../../project/application/project.store';
import {DatePipe} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-audios-view',
  imports: [
    DatePipe,
    RouterLink,
    RouterLinkActive,
    TranslatePipe
  ],
  templateUrl: './audios-view.html',
  styleUrl: './audios-view.css',
})
export class AudiosView {
  private projectStore = inject(Project);
  audios = this.projectStore.audios

  bestRatedAudios = computed(() =>
    [...this.audios()].sort((a, b) => b.rating - a.rating)
  );

  trendingAudios = computed(() =>
    this.bestRatedAudios()
  );

  newAudios = computed(() => {
    return [...this.audios()].sort((a, b) =>
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

  filteredAudios = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.audios();

    return this.audios().filter(audio =>
      audio.name.toLowerCase().includes(term)
    );
  });

  onSearch() {
    console.log('Buscando:', this.searchTerm());
  }

}
