import { Injectable } from '@angular/core';
import { SoilData } from './SoilData';

@Injectable({
  providedIn: 'root'
})
export class SoilClassificationService {
  classifySoil(soilData: SoilData) {
    console.log("it has worked");
    console.log(soilData);
    
  }

  constructor() { }
}
