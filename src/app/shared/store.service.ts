import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sensor } from '../Sensor';
import { Sensorendata } from '../Sensorendata';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  public isLoading: boolean=false;
  public sensorenDaten: Sensorendata[] = [];
  public sensorenDatenTotalCount: number = 0;
  public sensoren: Sensor[] = [];
}
