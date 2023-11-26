import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { SharedModule } from './shared/shared.module';

import { SoilClassificationFormComponent } from './soil-classification-form/soil-classification-form.component';
import { SoilClassificationResultComponent } from './soil-classification-result/soil-classification-result.component';
import { VerificationByEngineerFormComponent } from './verification-by-engineer-form/verification-by-engineer-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule,
    SoilClassificationFormComponent, SoilClassificationResultComponent, VerificationByEngineerFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Soil Classification Tool - ASTM D2487 (Prototype v0.1.3-20231126)';
}
