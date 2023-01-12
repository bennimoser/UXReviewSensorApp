import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { FormInfoComponent } from '../form-info/form-info.component';

@Component({
  selector: 'app-add-sensors-data',
  templateUrl: './add-sensors-data.component.html',
  styleUrls: ['./add-sensors-data.component.scss']
})
export class AddSensorsDataComponent implements OnInit {

  constructor(public dialog: MatDialog,public storeService: StoreService, private formBuilder: UntypedFormBuilder, public backendService: BackendService, public dialogRef: MatDialogRef<AddSensorsDataComponent>,private _snackbar:MatSnackBar) { }
  public sensorenDataForm: any;
  public showAddTask: boolean = false;
  public isAdding: boolean = false;
  @Input() currentPage: any;

  ngOnInit(): void {
    this.sensorenDataForm = this.formBuilder.group({
      sensorId: [this.storeService.sensoren[0].id, [ Validators.required ], ],
      temperature: ['', [ Validators.required, Validators.min(-45), Validators.max(50) ] ],
      humidity: ['', [ Validators.required, Validators.min(0), Validators.max(101) ] ],
      date:  [null, [ Validators.required ] ]
    });
  }

  resetFormAndClose(){
    this.sensorenDataForm.reset();
    this.dialogRef.close();
  }

  async onSubmit() {
    if(this.sensorenDataForm?.valid) {
      this.isAdding = true;
      try{
      await this.backendService.addSensorsData(this.sensorenDataForm.value, this.currentPage);
      this.sensorenDataForm.reset();
      this.isAdding = false;
      this._snackbar.open("Erstellen war erfolgreich","Schließen");
      }
      catch(e){
        this._snackbar.open("Es ist ein Fehler beim Erstellen aufgetreten!","Schließen");
      }
      this.dialogRef.close();
    }

  }

  openHelp(){
    this.dialog.open(FormInfoComponent);
  }

  toggleAddTask() {
    this.showAddTask = !this.showAddTask;
  }

  getInvalidClass(controlname:string){
    return this.sensorenDataForm.controls[controlname].invalid && this.sensorenDataForm.controls[controlname].touched ? "invalid" : "";
  }

}
