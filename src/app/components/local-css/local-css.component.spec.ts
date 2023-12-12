import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalCssComponent } from './local-css.component';

describe('LocalCssComponent', () => {
  let component: LocalCssComponent;
  let fixture: ComponentFixture<LocalCssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalCssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalCssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
