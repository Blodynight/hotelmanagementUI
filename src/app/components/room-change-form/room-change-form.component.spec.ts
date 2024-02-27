import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomChangeFormComponent } from './room-change-form.component';

describe('RoomChangeFormComponent', () => {
  let component: RoomChangeFormComponent;
  let fixture: ComponentFixture<RoomChangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomChangeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomChangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
