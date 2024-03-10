import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DEFAULT_TEST_CASES, ClassifiedSoilData, TestCase } from '../TestCases';
import { SoilClassificationService } from '../../domain/soil-classification.service';
import { SharedModule } from '../../shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-verification-dashboard',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './verification-dashboard.component.html',
  styleUrl: './verification-dashboard.component.css'
})
export class VerificationDashboardComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'expectedClassification',
    'classificationResults',
    'percentageOfGravel',
    'percentageOfSand',
    'percentageOfSilt',
    'percentageOfClay',
    'percentagePassingSieveNo200',
    'coefficientOfUniformity',
    'coefficientOfCurvature',
    'liquidLimit',
    'plasticityIndex',
    'atterbergLimitsSymbol',
    'percentageOfOrganicContent',
  ];

  dataSource!: MatTableDataSource<ClassifiedSoilData>;

  constructor(private soilClassificationService: SoilClassificationService) {
  }

  ngOnInit(): void {
    const transformedData = DEFAULT_TEST_CASES.map(testCase => ({
      testCase: testCase,
      classificationResults: "unknown",
      hasTestedPassed: null
    }));

    this.dataSource = new MatTableDataSource<ClassifiedSoilData>(transformedData);
  }

  runTestCases() {
    const transformedData = DEFAULT_TEST_CASES.map(testCase => ({
      testCase: testCase,
      classificationResults: this.soilClassificationService.classifySoilWithD2487Standard(testCase.data),
      hasTestedPassed: this.soilClassificationService.classifySoilWithD2487Standard(testCase.data) === testCase.expectedClassification
    }));

    this.dataSource = new MatTableDataSource<ClassifiedSoilData>(transformedData);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
