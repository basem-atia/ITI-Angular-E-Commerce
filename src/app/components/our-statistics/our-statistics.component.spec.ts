import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurStatisticsComponent } from './our-statistics.component';

describe('OurStatisticsComponent', () => {
  let component: OurStatisticsComponent;
  let fixture: ComponentFixture<OurStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
