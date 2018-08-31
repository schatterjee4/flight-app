import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import {FormService} from '../services/form.shared.service';

@Component({
  selector: 'app-flight-booking-cancel-refund',
  templateUrl: './flight.booking.cancel.refund.html',
  styleUrls: ['./flight.booking.cancel.refund.scss']
})
export class FlightCancelRefComponent {
  
  mycancelForm: FormGroup;
  clickedItem:string;
    public model: any;

  constructor(private fb: FormBuilder,private router: Router,private _dataService: FormService) { 
  
  }
    ngOnInit() {
    
    this.mycancelForm = this.fb.group({
      pnrSrch: '',
      lnameSrch: ''
     
    });

    this.mycancelForm.valueChanges.subscribe(console.log);
  }
  onSubmit() {
    if (this.mycancelForm.valid) {
      console.log("Form Submitted!");
     //tbd
    }
    console.log("Form entry!");
    Object.keys(this.mycancelForm.controls).forEach((key: string) => {
      this._dataService.setOption(key,this.mycancelForm.controls[key].value);

    });
    this.router.navigate(['view']);
  }
}
