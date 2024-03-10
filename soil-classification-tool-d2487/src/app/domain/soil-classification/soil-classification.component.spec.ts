import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoilClassificationComponent } from './soil-classification.component';

describe('SoilClassificationComponent', () => {
  let component: SoilClassificationComponent;
  let fixture: ComponentFixture<SoilClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoilClassificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoilClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
