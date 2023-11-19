import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SoilClassificationFormComponent } from './soil-classification-form/soil-classification-form.component';
import { SoilClassificationResultComponent } from './soil-classification-result/soil-classification-result.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSlideToggleModule, SoilClassificationFormComponent, SoilClassificationResultComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'soil-classification-tool-d2487';
}
