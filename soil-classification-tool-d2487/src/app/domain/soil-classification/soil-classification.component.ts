import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SoilClassificationFormComponent } from '../../soil-classification-form/soil-classification-form.component';
import { SoilClassificationResultComponent } from '../../soil-classification-result/soil-classification-result.component';
import { VerificationByEngineerFormComponent } from '../../verification-by-engineer-form/verification-by-engineer-form.component';

@Component({
  selector: 'app-soil-classification',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    SoilClassificationFormComponent, SoilClassificationResultComponent, VerificationByEngineerFormComponent,],
  templateUrl: './soil-classification.component.html',
  styleUrl: './soil-classification.component.css'
})
export class SoilClassificationComponent {

}
