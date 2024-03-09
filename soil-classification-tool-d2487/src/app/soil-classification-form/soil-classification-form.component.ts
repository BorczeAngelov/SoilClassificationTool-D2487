// In your component class file
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SoilClassificationService } from '../domain/soil-classification.service';
import { AtterbergLimitsSymbol, SoilData } from '../domain/SoilData';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassifiedSoilData, normalTestCases } from '../tests/TestCases';

@Component({
  selector: 'app-soil-classification-form',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './soil-classification-form.component.html',
  styleUrls: ['./soil-classification-form.component.css']
})
export class SoilClassificationFormComponent {
  soilForm: FormGroup;
  atterbergLimitsSymbolOptions = Object.values(AtterbergLimitsSymbol);

  constructor(
    private fb: FormBuilder,
    private soilClassificationService: SoilClassificationService,
    private _snackBar: MatSnackBar
  ) {
    this.soilForm = this.fb.group({
      percentageOfGravel: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      percentageOfSand: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      percentageOfSilt: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      percentageOfClay: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      coefficientOfCurvature: [null],
      coefficientOfUniformity: [null],
      d10: [0],
      d30: [0],
      d60: [0],
      percentagePassingSieveNo200: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      liquidLimit: [null, Validators.required],
      plasticityIndex: [null, Validators.required],
      atterbergLimitsSymbol: [null, Validators.required],
      percentageOfOrganicContent: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  runTestCases(){
    normalTestCases.forEach(testCase => {
      const classificationResults = this.soilClassificationService.classifySoilWithD2487Standard(testCase.data);      

      // Construct a ClassifiedSoilData object for structured logging
      const classifiedSoilData: ClassifiedSoilData = {
        testCase,
        classificationResults,
        isSuccess: classificationResults === testCase.expectedClassification
      };
          
      console.log(classifiedSoilData);
      console.log(`Test Case ID: ${classifiedSoilData.testCase.id} ${classifiedSoilData.isSuccess ? "PASSED" : "FAILED"} , Expected: ${classifiedSoilData.testCase.expectedClassification}, Result: ${classifiedSoilData.classificationResults}`);
    });    
  }

  onSubmit() {
    if (this.soilForm.valid){      
      const soilData: SoilData = this.soilForm.value;
      
      const areCoefficientValuesGiven = !soilData.coefficientOfCurvature || !soilData.coefficientOfUniformity;
      if (areCoefficientValuesGiven) {
                  
          soilData.coefficientOfCurvature = this.soilClassificationService.calculateCoefficientOfCurvature(soilData.d10, soilData.d30, soilData.d60);          
          soilData.coefficientOfUniformity = this.soilClassificationService.calculateCoefficientOfUniformity(soilData.d10, soilData.d60);        
      }
      
      this.notifyOnSieve200Discrepancy(soilData)
      this.soilClassificationService.classifySoilWithD2487Standard(soilData);
    }
  }

  notifyOnSieve200Discrepancy(soilData: SoilData) {    
    let combinedPercentage = soilData.percentageOfSilt + soilData.percentageOfClay;  
    
    if (soilData.percentagePassingSieveNo200 > 50 && combinedPercentage < 50) {
      this._snackBar.open(
        `Warning: Sieve No. 200 passage is ${soilData.percentagePassingSieveNo200}% and combined silt and clay content (${combinedPercentage}%) is less than 50%.\n` +
        `This may indicate a discrepancy in soil classification as per ASTM D2487 standards.`,
        "Review Data"
      );
    }
  }
}