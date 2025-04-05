import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordPhoneComponent } from './reset-password-phone.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordPhoneComponent;
  let fixture: ComponentFixture<ResetPasswordPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordPhoneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
