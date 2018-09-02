import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Observable,BehaviorSubject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import {FormService, states} from '../services/form.shared.service';
import { NgbdModalComponent } from '../flight.booking.popup/flight.booking.pop.component';

@Component({
  selector: 'app-flight-record-component',
  templateUrl: './flight.record.component.html',
  styleUrls: ['./flight.record.component.scss']
})
export class FlightRecordComponent  implements OnInit   {
  title = 'app';
  myrecordForm: FormGroup;
  clickedItem:string;
    public model: any;
    public records: any;
    _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  

  constructor(private fb: FormBuilder,private router: Router,private _dataService: FormService,  private  modal: NgbdModalComponent ) { 
    // this.modal.openVerticallyCentered('loader','md');

  }
  
  ngOnInit() {
    this.myrecordForm = this.fb.group({
     data: {}
    });
    setTimeout(() => {this.modal.openVerticallyCentered('loader','md','loader')});

    //this.isLoading$.next(true);
    this._isLoading$.next(true);
   let pnrSrch = this._dataService.get()['pnrSrch'];
   let lnameSrch = this._dataService.get()['lnameSrch'];
   this._dataService.fetchView(pnrSrch, lnameSrch).subscribe((data: any) => {
     let formdata = data;

     let origin = formdata['source'];
     let originDescr = states.filter(v => v.key.toLowerCase().indexOf(origin.toLowerCase()) > -1).map((state) => state.value );
     let dest = formdata['destination'];
     let destDescr = states.filter(v => v.key.toLowerCase().indexOf(dest.toLowerCase()) > -1).map((state) => state.value );
     formdata = Object.assign(formdata,{'originDescr':originDescr});
     formdata = Object.assign(formdata,{'destDescr':destDescr});

     this.myrecordForm.setValue({'data':formdata});
    this.modal.closeActive();
    this._isLoading$.next(false);

  },
  complete => {
    console.log('done');
    this.modal.closeActive();
    this._isLoading$.next(false);
   
  });
 //setTimeout(()=>{this.modal.closeActive();,400);
   // this.myrecordForm.valueChanges.subscribe(console.log);
  }
  onSubmit() {
    this.modal.openVerticallyCentered('precancelcheck','md','');
   
    if(this.myrecordForm.value.data.fop=="pp")
    {
      setTimeout(()=>{ this.closeAndOpenModal(); }, 4000);
     

    }else{
      this._dataService.setOption('viewRecord', this.myrecordForm.get('data'));

      setTimeout(()=>{this.modal.closeActive(); this.router.navigate(['cancel'])}, 2000);
    }
   

  }
  closeAndOpenModal(){
    this.modal.closeActive(); this.modal.openVerticallyCentered('precancel','md','');
  }
}