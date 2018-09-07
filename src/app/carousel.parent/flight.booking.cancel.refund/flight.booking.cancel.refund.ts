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
export class FlightCancelRefComponent implements OnInit {
  
  mycancelForm: FormGroup;
  clickedItem:string;
    public model: any;
    _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    

  constructor(private fb: FormBuilder,private router: Router,private _dataService: FormService,  private  modal: NgbdModalComponent ) { 
  
  }
    ngOnInit() {
    
    this.mycancelForm = this.fb.group({
      data:{}
     
    });
    setTimeout(() => {this.modal.openVerticallyCentered('loader','md','loader')});
    this._isLoading$.next(true);

    let pnrSrch = this._dataService.get()['pnrSrch'];
    let lnameSrch = this._dataService.get()['lnameSrch'];
    this._dataService.fetchRefund(pnrSrch, lnameSrch).subscribe((data: any) => {
      let formdata =this._dataService.get()['viewRecord'];
      formdata = Object.assign(formdata,{'cancellationCharge':data.cancellationCharge});
      formdata = Object.assign(formdata,{'refundAmount':data.refundAmount});
      this.mycancelForm.setValue({'data':formdata});
      console.log(formdata);
      setTimeout(() => {this.modal.closeActive(); this._isLoading$.next(false);
      },2000);
    },
    complete => {
      console.log('done');
      this.modal.closeActive();
      this._isLoading$.next(false);
     
    });
   
    this.mycancelForm.valueChanges.subscribe(console.log);
   

    
  }
  onSubmit() {
    if (this.mycancelForm.valid) {
      console.log("Form Submitted!");
     //tbd
    }
    let pnrSrch = this._dataService.get()['pnrSrch'];
    let refundAmount = this.mycancelForm.value.data.refundAmount;

    this._dataService.confirmCancel(pnrSrch, refundAmount).subscribe((data: any) => {
      if(data!=null)
      {
        if(data.status=="Success"){
          let viewRecord=this._dataService.get()['viewRecord'];
          viewRecord = Object.assign(viewRecord,{'refundAmount':refundAmount});
          this._dataService.setOption('viewRecord',viewRecord);
          this.router.navigate(['refund']);
        }
      }
    });
  }
  redirectToRoute(route) {
    this.router.navigate([route]);

  }
}
