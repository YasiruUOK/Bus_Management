import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusService } from 'src/app/shared/bus.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editbus',
  templateUrl: './editbus.component.html',
  styleUrls: ['./editbus.component.css']
})
export class EditbusComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', {static: false}) chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  editBusForm: FormGroup;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public fb: FormBuilder,
    private busApi: BusService,
    private location: Location,
    private actRoute: ActivatedRoute,
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.busApi.GetBus(id).valueChanges().subscribe(data => {
      this.editBusForm.setValue(data);
    })
  }

  ngOnInit() {
    this.updateBusForm();
  }
/* Update form */
updateBusForm(){
  this.editBusForm = this.fb.group({
    bus_number: ['', [Validators.required]],
    owner_name: ['', [Validators.required]],
    route: ['', [Validators.required]],
    register_date: ['', [Validators.required]],
    permision: ['Yes'],
    price: ['', [Validators.required]]
  })
}

/* Add language */
add(event: MatChipInputEvent): void {
  var input: any = event.input;
  var value: any = event.value;
  // Reset the input value
  if (input) {
    input.value = '';
  }
}


/* Get errors */
public handleError = (controlName: string, errorName: string) => {
  return this.editBusForm.controls[controlName].hasError(errorName);
}

/* Date */
formatDate(e) {
  var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
  this.editBusForm.get('register_date').setValue(convertDate, {
    onlyself: true
  })
}

/* Go to previous page */
goBack(){
  this.location.back();
}

/* Submit book */
updateBus() {
  var id = this.actRoute.snapshot.paramMap.get('id');
  if(window.confirm('Are you sure you wanna update?')){
      this.busApi.UpdateBus(id, this.editBusForm.value);
    this.router.navigate(['viewbus']);
  }
}
}
