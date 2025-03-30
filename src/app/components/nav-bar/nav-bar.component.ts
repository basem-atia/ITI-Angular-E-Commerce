import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
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
