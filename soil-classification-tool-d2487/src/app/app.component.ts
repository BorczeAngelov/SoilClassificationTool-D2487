import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Soil Classification Tool - ASTM D2487';
  appVersion = "Prototype v0.4.0 - 10.03.2024"
}
