import { Component, input } from '@angular/core';
import {Art} from '../../../../project/domain/model/art.entity';

@Component({
  selector: 'app-art-item',
  imports: [],
  templateUrl: './art-item.html',
  styleUrl: './art-item.css'
})
export class ArtItem {
  art = input.required<Art>();
}
