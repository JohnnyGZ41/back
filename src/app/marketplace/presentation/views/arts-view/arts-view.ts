import {Component, computed, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {Project} from '../../../../project/application/project.store';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-arts-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    TranslatePipe
  ],
  templateUrl: './arts-view.html',
  styleUrl: './arts-view.css'
})
export class ArtsView {

  private projectStore = inject(Project);
  arts = this.projectStore.arts

  bestRatedArts = computed(() =>
    [...this.arts()].sort((a, b) => b.rating - a.rating)
  );

  newArts = computed(() => {
    return [...this.arts()].sort((a, b) =>
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

  filteredArts = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.arts();

    return this.arts().filter(art =>
      art.name.toLowerCase().includes(term)
    );
  });

  onSearch() {
    console.log('Buscando:', this.searchTerm());
  }


}
