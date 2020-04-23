import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DataService} from './sensors/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor() {}

}
