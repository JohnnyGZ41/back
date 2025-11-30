import {Component, input} from '@angular/core';
import {Audio} from '../../../../project/domain/model/audio.entity';

@Component({
  selector: 'app-audio-item',
  imports: [],
  templateUrl: './audio-item.html',
  styleUrl: './audio-item.css'
})
export class AudioItem {
  audio = input.required<Audio>()
}
