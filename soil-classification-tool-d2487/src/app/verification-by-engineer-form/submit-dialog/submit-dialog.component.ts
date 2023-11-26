import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';


export interface DialogData {
  csvData: string;
}

@Component({
  selector: 'app-submit-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, SharedModule],
  templateUrl: './submit-dialog.component.html',
  styleUrl: './submit-dialog.component.css'
})
export class SubmitDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
