import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SoilClassificationService } from '../domain/soil-classification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CsvUtilService } from './csv-util.service';

@Component({
  selector: 'app-verification-by-engineer-form',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './verification-by-engineer-form.component.html',
  styleUrl: './verification-by-engineer-form.component.css'
})
export class VerificationByEngineerFormComponent {
  verificationForm: FormGroup;

  constructor(
    public soilClassificationService: SoilClassificationService,
    public csvUtilService: CsvUtilService,
    private fb: FormBuilder
  ) {
    this.verificationForm = this.fb.group({
      dateOfTesting: [null, Validators.required],
      geotechnicalEngineer: [null, Validators.required],
      geotechnicalEngineerCompany: [null, Validators.required],
      geotechnicalEngineerContact: [null, [Validators.required, Validators.email]],
      classificationByEngineer: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.verificationForm.valid) {
      const formValue = this.verificationForm.value;
      console.log(formValue);
      // this.csvUtilService.writeToCsv(formValue);
    }
  }
}
