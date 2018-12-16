import { Component } from '@angular/core';
import vhCheck from 'vh-check';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  test = vhCheck();
}
