import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilClassificationResultComponent } from './soil-classification-result.component';

describe('SoilClassificationResultComponent', () => {
  let component: SoilClassificationResultComponent;
  let fixture: ComponentFixture<SoilClassificationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoilClassificationResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoilClassificationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
