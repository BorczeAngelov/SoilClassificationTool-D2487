// In your component class file
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SoilClassificationService } from '../domain/soil-classification.service';
import { SoilData } from '../domain/SoilData';

@Component({
  selector: 'app-soil-classification-form',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './soil-classification-form.component.html',
  styleUrls: ['./soil-classification-form.component.css']
})
export class SoilClassificationFormComponent {
  soilForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private soilClassificationService: SoilClassificationService
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

  onSubmit() {
    if (this.soilForm.valid){      
      const soilData: SoilData = this.soilForm.value;

      
      const areCoefficientValuesGiven = !soilData.coefficientOfCurvature || !soilData.coefficientOfUniformity;
      if (areCoefficientValuesGiven) {
                  
          soilData.coefficientOfCurvature = this.soilClassificationService.calculateCoefficientOfCurvature(soilData.d10, soilData.d30, soilData.d60);          
          soilData.coefficientOfUniformity = this.soilClassificationService.calculateCoefficientOfUniformity(soilData.d10, soilData.d60);        
      }
      
      this.soilClassificationService.classifySoilWithD2487Standard(soilData);    
    }
  }

}
