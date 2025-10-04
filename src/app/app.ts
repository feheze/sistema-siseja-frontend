import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavigationComponent } from './components/navigation/navigation';

@Component({
  selector: 'app-root',
  imports: [NavigationComponent],
  template: `<app-navigation />`,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}