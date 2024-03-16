import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class AppComponent implements OnInit {
  title = 'Soil Classification Tool - ASTM D2487';
  appVersion = "Prototype v0.5.0 - 16.03.2024"

  constructor(private _snackBar: MatSnackBar) { }


  ngOnInit(): void {

    this._snackBar.open('🌍 To enhance your experience and improve our global service, we analyze site usage with Google Analytics.'
      + ' Rest assured, your data remains anonymous. 🛡️',
      'Understood', {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
