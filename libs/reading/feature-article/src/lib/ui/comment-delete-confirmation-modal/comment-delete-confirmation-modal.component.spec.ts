import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDeleteConfirmationModalComponent } from './comment-delete-confirmation-modal.component';

describe('CommentDeleteConfirmationModalComponent', () => {
  let component: CommentDeleteConfirmationModalComponent;
  let fixture: ComponentFixture<CommentDeleteConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommentDeleteConfirmationModalComponent
      ],
      providers: [Overlay]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentDeleteConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
