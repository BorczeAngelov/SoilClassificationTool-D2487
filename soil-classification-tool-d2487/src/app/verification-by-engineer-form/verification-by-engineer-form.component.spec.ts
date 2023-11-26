import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationByEngineerFormComponent } from './verification-by-engineer-form.component';

describe('VerificationByEngineerFormComponent', () => {
  let component: VerificationByEngineerFormComponent;
  let fixture: ComponentFixture<VerificationByEngineerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificationByEngineerFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerificationByEngineerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
