import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { SharedModule } from './shared/shared.module';

import { SoilClassificationFormComponent } from './soil-classification-form/soil-classification-form.component';
import { SoilClassificationResultComponent } from './soil-classification-result/soil-classification-result.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    SoilClassificationFormComponent, SoilClassificationResultComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Soil Classification Tool - ASTM D2487 (Prototype v0.0.3.2; Note: classifyCoarseGrainedSoilWithDominantMaterialGravel() is ready for testing)';
}
