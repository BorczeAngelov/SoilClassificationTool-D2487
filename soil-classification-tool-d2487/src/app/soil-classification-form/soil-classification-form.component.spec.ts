import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilClassificationFormComponent } from './soil-classification-form.component';

describe('SoilClassificationFormComponent', () => {
  let component: SoilClassificationFormComponent;
  let fixture: ComponentFixture<SoilClassificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoilClassificationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoilClassificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
