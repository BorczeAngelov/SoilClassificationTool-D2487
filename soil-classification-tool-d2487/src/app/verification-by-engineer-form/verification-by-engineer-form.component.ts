import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SoilClassificationService } from '../domain/soil-classification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CsvUtilService } from './csv-util.service';
import { VerificationByGeotechnicalEngineerData } from './VerificationByGeotechnicalEngineerData';
import { MatDialog } from '@angular/material/dialog';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog.component';

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
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    this.verificationForm = this.fb.group({
      geotechnicalEngineer: [null, Validators.required],
      geotechnicalEngineerCompany: [null, Validators.required],
      geotechnicalEngineerContact: [null, [Validators.required, Validators.email]],
      classificationByEngineer: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.verificationForm.valid) {
      const formValue = this.verificationForm.value;

      // 1. Generate new VerificationByGeotechnicalEngineerData object from the formValue, the soilClassificationService.rawInputData and the soilClassificationService.rawOutputData
      const verificationData: VerificationByGeotechnicalEngineerData = {
        ...formValue,
        ...this.soilClassificationService.rawInputData,
        classificationBySoftware: this.soilClassificationService.rawOutputData,
        doesClassificationMatch: formValue.classificationByEngineer === this.soilClassificationService.rawOutputData,
        dateOfTesting: new Date(), // or set this to the actual date of testing
      };

      // 2. Call this.csvUtilService.writeToCsv(formValue);
      var csvData = this.csvUtilService.convertToCSV(verificationData);

      // 3. Display a dialog to the user, so he can copy the csv value
      this.dialog.open(SubmitDialogComponent, {
        data: { csvData: csvData }
      });
    }
  }
}