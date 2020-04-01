import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusService } from 'src/app/shared/bus.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-addbus',
  templateUrl: './addbus.component.html',
  styleUrls: ['./addbus.component.css']
})
export class AddbusComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList' , {static: false}) chipList;
  @ViewChild('resetBusForm', {static: false}) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  busForm: FormGroup;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public fb: FormBuilder,
    private busApi: BusService
    ) { }

  ngOnInit() {
    this.busApi.GetBusList();
    this.submitBusForm();
  }

/* Reactive book form */
submitBusForm() {
  this.busForm = this.fb.group({
    bus_number: ['', [Validators.required]],
    owner_name: ['', [Validators.required]],
    route: ['', [Validators.required]],
    register_date: ['', [Validators.required]],
    permision: ['Yes'],
    price: ['', [Validators.required]]
  })
}

/* Get errors */
public handleError = (controlName: string, errorName: string) => {
  return this.busForm.controls[controlName].hasError(errorName);
}

 /* Add dynamic languages */
 add(event: MatChipInputEvent): void {
  const input = event.input;
  const value = event.value;
  
  // Reset the input value
  if (input) {
    input.value = '';
  }
}

/* Date */
formatDate(e) {
  var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
  this.busForm.get('register_date').setValue(convertDate, {
    onlyself: true
  })
}

 /* Reset form */
 resetForm() {
  this.busForm.reset();
  Object.keys(this.busForm.controls).forEach(key => {
    this.busForm.controls[key].setErrors(null)
  });
}

/* Submit book */
submitBus() {
  if (this.busForm.valid){
    this.busApi.AddBus(this.busForm.value)
    this.resetForm();
  }
}

}
