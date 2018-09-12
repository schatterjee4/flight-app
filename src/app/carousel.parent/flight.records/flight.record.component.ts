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
   let formdata = {};
   this._dataService.fetchView(pnrSrch, lnameSrch).subscribe((data: any) => {
    
     if(data!=null && data!="" && Object.keys(data).length !=0){
      formdata = data;

     let origin = formdata['source'];
     let originDescr = states.filter(v => v.key.toLowerCase().indexOf(origin.toLowerCase()) > -1).map((state) => state.value );
     let dest = formdata['destination'];
     let destDescr = states.filter(v => v.key.toLowerCase().indexOf(dest.toLowerCase()) > -1).map((state) => state.value );
     formdata = Object.assign(formdata,{'originDescr':originDescr});
     formdata = Object.assign(formdata,{'destDescr':destDescr});
     let status = this._dataService.getStatusDescr(formdata['status']);
     let statusDescr ="";
     statusDescr = status!=null || status.length!= 0 ? status[0].value : "";
     formdata = Object.assign(formdata,{'statusDescr':statusDescr});
     let airline = this._dataService.getAirlineDescr(formdata['carrier']);
     let airlineDescr = airline!=null || airline.length!= 0 ? airline[0].value : "";

     formdata = Object.assign(formdata,{'airlineDescr':airlineDescr});

     let duration = formdata['duration'];
    if(duration!=null && duration!="")
    {
      duration = duration.replace("mins","");
      var min = duration*1 % 60;
      var hours = Math.floor(duration*1 / 60);
      formdata = Object.assign(formdata,{'duration':hours+"h\n"+min+'m'});

    }
  }
     this.myrecordForm.setValue({'data':formdata});
    this.modal.closeActive();
    this._isLoading$.next(false);

  },
  complete => {
    console.log('done');
    this.myrecordForm.setValue({'data':formdata});
    this.modal.closeActive();
    this._isLoading$.next(false);
   
  });
 //setTimeout(()=>{this.modal.closeActive();,400);
   // this.myrecordForm.valueChanges.subscribe(console.log);
  }
  onSubmit() {
    this.modal.openVerticallyCentered('precancelcheck','md','');
   
    let fop= this._dataService.getConfigByName('fop');
    let airline= this._dataService.getConfigByName('airline');

    // tslint:disable-next-line:max-line-length
    if((fop!=null && this.myrecordForm.value.data.fop==fop.value[0]) || (airline!=null && this.myrecordForm.value.data.carrier==airline.value[0])  )
    {
      setTimeout(()=>{ this.closeAndOpenModal(); }, 4000);
     

    }else{
      this._dataService.setOption('viewRecord', this.myrecordForm.value.data);

      setTimeout(()=>{this.modal.closeActive(); this.router.navigate(['cancel'])}, 2000);
    }
   

  }
  closeAndOpenModal(){
    this.modal.closeActive(); this.modal.openVerticallyCentered('precancel','md','');
  }
  redirectToRoute(route) {
    this.router.navigate([route]);

  }
}