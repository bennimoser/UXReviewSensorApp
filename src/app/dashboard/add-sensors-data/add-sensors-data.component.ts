import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-add-sensors-data',
  templateUrl: './add-sensors-data.component.html',
  styleUrls: ['./add-sensors-data.component.scss']
})
export class AddSensorsDataComponent implements OnInit {

  constructor(public storeService: StoreService, private formBuilder: UntypedFormBuilder, public backendService: BackendService, public dialogRef: MatDialogRef<AddSensorsDataComponent>) { }
  public sensorenDataForm: any;
  public showAddTask: boolean = false;
  public isAdding: boolean = false;
  @Input() currentPage: any;

  ngOnInit(): void {
    this.sensorenDataForm = this.formBuilder.group({
      sensorId: [0, [ Validators.required ] ],
      temperature: ['', [ Validators.required ] ],
      humidity: ['', [ Validators.required ] ],
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
      await this.backendService.addSensorsData(this.sensorenDataForm.value, this.currentPage);
      this.sensorenDataForm.reset();
      this.isAdding = false
      this.dialogRef.close();
    }
  }

  toggleAddTask() {
    this.showAddTask = !this.showAddTask;
  }

}
