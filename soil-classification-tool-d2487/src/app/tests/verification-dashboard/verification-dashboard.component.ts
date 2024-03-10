import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { normalTestCases, ClassifiedSoilData } from '../TestCases';
import { SoilClassificationService } from '../../domain/soil-classification.service';

@Component({
  selector: 'app-verification-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verification-dashboard.component.html',
  styleUrl: './verification-dashboard.component.css'
})
export class VerificationDashboardComponent {

  constructor(private soilClassificationService: SoilClassificationService) {
  }


  runTestCases() {
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
}
