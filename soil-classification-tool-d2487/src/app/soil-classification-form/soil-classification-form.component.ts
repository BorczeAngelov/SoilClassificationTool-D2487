import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';


@Component({
  selector: 'app-soil-classification-form',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './soil-classification-form.component.html',
  styleUrl: './soil-classification-form.component.css'
})
export class SoilClassificationFormComponent {

}
