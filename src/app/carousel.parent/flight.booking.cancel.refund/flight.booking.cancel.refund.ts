import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Observable, BehaviorSubject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import {FormService} from '../services/form.shared.service';
import { NgbdModalComponent } from '../flight.booking.popup/flight.booking.pop.component';

@Component({
  selector: 'app-flight-booking-cancel-refund',
  templateUrl: './flight.booking.cancel.refund.html',
  styleUrls: ['./flight.booking.cancel.refund.scss']
})
export class FlightCancelRefComponent {
  
  mycancelForm: FormGroup;
  clickedItem:string;
    public model: any;
    _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private fb: FormBuilder,private router: Router,private _dataService: FormService,  private  modal: NgbdModalComponent ) { 
  
  }
    ngOnInit() {
    
    this.mycancelForm = this.fb.group({
      pnrSrch: '',
      lnameSrch: ''
     
    });
    setTimeout(() => {this.modal.openVerticallyCentered('loader','md','loader')});

    //this.isLoading$.next(true);
    this._isLoading$.next(true);
    this.mycancelForm.valueChanges.subscribe(console.log);
    setTimeout(() => {this.modal.closeActive(); this._isLoading$.next(false);
    },2000);

    
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
