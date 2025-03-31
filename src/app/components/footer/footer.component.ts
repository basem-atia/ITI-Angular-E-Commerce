import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-footer',
  imports: [LogoComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  hide: boolean = false;
  constructor(router: Router) {
    router.events.subscribe((e) => {
      let eventString = e.toString();
      if (eventString.includes('ActivationStart')) {
        this.hide =
          eventString.includes('login') || eventString.includes('signup');
      }
    });
  }
}
