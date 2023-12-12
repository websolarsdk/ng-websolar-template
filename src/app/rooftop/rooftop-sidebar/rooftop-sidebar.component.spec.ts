import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RooftopSidebarComponent } from './rooftop-sidebar.component';

describe('RooftopSidebarComponent', () => {
  let component: RooftopSidebarComponent;
  let fixture: ComponentFixture<RooftopSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RooftopSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RooftopSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
