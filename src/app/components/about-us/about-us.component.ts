import { Component } from '@angular/core';
import { OurStoryComponent } from '../our-story/our-story.component';
import { OurStaffComponent } from '../our-staff/our-staff.component';
import { OurFeaturesComponent } from '../our-features/our-features.component';
import { OurStatisticsComponent } from '../our-statistics/our-statistics.component';

@Component({
  selector: 'app-about-us',
  imports: [
    OurStoryComponent,
    OurStaffComponent,
    OurFeaturesComponent,
    OurStatisticsComponent,
  ],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css',
})
export class AboutUsComponent {}
