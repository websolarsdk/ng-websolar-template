import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitPageComponent } from './permit-page.component';

describe('PermitPageComponent', () => {
  let component: PermitPageComponent;
  let fixture: ComponentFixture<PermitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
