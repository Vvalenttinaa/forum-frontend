import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMessageDialogComponent } from './show-message-dialog.component';

describe('ShowMessageDialogComponent', () => {
  let component: ShowMessageDialogComponent;
  let fixture: ComponentFixture<ShowMessageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowMessageDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
