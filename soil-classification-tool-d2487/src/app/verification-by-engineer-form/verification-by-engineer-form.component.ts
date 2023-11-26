import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SoilClassificationService } from '../domain/soil-classification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CsvUtilService } from './csv-util.service';
import { VerificationByGeotechnicalEngineerData } from './VerificationByGeotechnicalEngineerData';
import { MatDialog } from '@angular/material/dialog';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog.component';
import { SoilData } from '../domain/SoilData';

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

      const verificationData = this.convertToVerificationData(
        formValue,
        this.soilClassificationService.rawInputData,
        this.soilClassificationService.rawOutputData);

      var csvData = this.csvUtilService.convertToCSV(verificationData);

      this.dialog.open(SubmitDialogComponent, {
        data: { csvData: csvData }
      });
    }
  }

  convertToVerificationData(formValue: any, rawInputData: SoilData, rawOutputData: string): VerificationByGeotechnicalEngineerData {
    let verificationData: VerificationByGeotechnicalEngineerData = {
      dateOfTesting: new Date().toLocaleDateString('de-DE'),
      ...formValue,
      ...rawInputData,
      classificationBySoftware: rawOutputData,
      doesClassificationMatch: formValue.classificationByEngineer === rawOutputData,
      commentByEngineer: "commentByEngineer-Work-In-Progress"
    };
    return verificationData;
  }
}