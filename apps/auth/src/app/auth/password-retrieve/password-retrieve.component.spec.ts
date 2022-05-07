import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordRetrieveComponent } from './password-retrieve.component';

describe('PasswordRetrieveComponent', () => {
  let component: PasswordRetrieveComponent;
  let fixture: ComponentFixture<PasswordRetrieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordRetrieveComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordRetrieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
