import {Component, input} from '@angular/core';
import {Game} from '../../../../project/domain/model/game.entity';

@Component({
  selector: 'app-game-item',
  imports: [],
  templateUrl: './game-item.html',
  styleUrl: './game-item.css'
})
export class GameItem {
  game = input.required<Game>();
}
