import { Component, OnInit } from '@angular/core';
import { SensorPosition } from 'src/app/Sensor';
import { BackendService } from 'src/app/shared/backend.service';
import { SENSORS_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';
import {MatDialog} from '@angular/material/dialog';
import { AddSensorsDataComponent } from '../add-sensors-data/add-sensors-data.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-sensors-data',
  templateUrl: './sensors-data.component.html',
  styleUrls: ['./sensors-data.component.scss']
})
export class SensorsDataComponent implements OnInit {
  public isdeleting: boolean = false;;
  public todeleteItemId: number = -1;

  public get SensorPosition() {return SensorPosition; }

  constructor(private backendService: BackendService, public storeService: StoreService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  public pages: number = 0;
  public currentPage: number = 1;
  public indexes: number[] = [];


  async ngOnInit() {
    this.storeService.isLoading = true;
    try{
    await this.backendService.getSensoren();
    await this.backendService.getSensorenDaten(this.currentPage);
    }
    catch(e){
      this._snackBar.open("Es ist ein Fehler beim Abrufen der Daten geschehen!","Schließen");
    }
    this.pages = Math.ceil(this.storeService.sensorenDatenTotalCount / SENSORS_PER_PAGE);
    this.storeService.isLoading = false;
  }

  async deleteSensordata(id: number) {
    this.todeleteItemId = id;
    this.isdeleting = true;
    this.indexes.push(id);
    try{
    await this.backendService.deleteSensorsDaten(id, this.currentPage);
    this._snackBar.open("Löschen war erfolgreich","Schließen");
    }
    catch(e){
      this._snackBar.open("Fehler beim Löschen","Schließen");
    }
    this.isdeleting = false;
  }

  async selectPage(i: any) {
    this.storeService.isLoading = true;
    this.currentPage = i + 1;
    try{
    await this.backendService.getSensorenDaten(this.currentPage);
    }
    catch(e){
      this._snackBar.open("Es ist ein Fehler beim Abrufen der Daten geschehen!","Schließen");
    }
    this.storeService.isLoading = false;
  }

  openDialog(){
    this.dialog.open(AddSensorsDataComponent,{
      height: '500px',
      width: '500px',
    });
  }
}
