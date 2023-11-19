import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SoilClassificationService } from '../domain/soil-classification.service';

@Component({
  selector: 'app-soil-classification-result',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './soil-classification-result.component.html',
  styleUrl: './soil-classification-result.component.css'
})
export class SoilClassificationResultComponent {

  constructor(public soilClassificationService: SoilClassificationService) { }

  ngOnInit(): void {
  }
}
