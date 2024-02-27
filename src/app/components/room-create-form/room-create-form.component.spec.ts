import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCreateFormComponent } from './room-create-form.component';

describe('RoomFormComponent', () => {
  let component: RoomCreateFormComponent;
  let fixture: ComponentFixture<RoomCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomCreateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
