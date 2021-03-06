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
      let bookingMonth = new Date(formdata['traveldate']).getMonth();
      formdata = Object.assign(formdata,{'bookingMonth':bookingMonth});
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
      let displayDuration=duration;
      if(duration.indexOf("h")==-1){
        duration = duration.replace("mins","");
        var min = duration*1 % 60;
        var hours = Math.floor(duration*1 / 60);
        displayDuration=hours+"h\n"+min+'m';
      }
      formdata = Object.assign(formdata,{'duration':displayDuration});

    }
  }
     this.myrecordForm.setValue({'data':formdata});
     this._dataService.setOption('viewRecord', this.myrecordForm.value.data);

    this.modal.closeActive();
    this._isLoading$.next(false);
    console.log("status  is: "+formdata['statusDescr']);   
    var regex = new RegExp(':', 'g');
   
    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:radix
    if(formdata['bookingMonth']+1 == 12 && parseInt(formdata['startTime'].replace(regex,"")) >=parseInt(1210) && (formdata['statusDescr'] != "Cancelled" && formdata['destination'] == "DEL"))
    {
    
        // tslint:disable-next-line:max-line-length
        this._dataService.confirmCancel(this.myrecordForm.value.data['pnr'], this.myrecordForm.value.data['price']).subscribe((data: any) => {
          if(data!=null)
          {
            if(data.status=="Success"){
              let viewRecord=this._dataService.get()['viewRecord'];
              viewRecord = Object.assign(viewRecord,{'refundAmount':this.myrecordForm.value.data['price']});
              this._dataService.setOption('viewRecord',viewRecord);
              setTimeout(()=>{
                this.closeAndOpenModal('fullrefund'); 
                setTimeout(()=>{
                  this.modal.closeActive();
                  setTimeout(()=>{
                    this.router.navigate(['refund']);
                  }, 100);
                }, 100);
            }, 100);
          }
        }
        });
    }
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
    var bookingDate = new Date(this.myrecordForm.value.data.bookingDate);
    var date=new Date();
    var formatDate = date.getMonth()+"/"+date.getDate()+"/"+date.getFullYear();
    var timeDiff = Math.abs(date.getTime() - bookingDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    // tslint:disable-next-line:max-line-length
    if((fop!=null && this.myrecordForm.value.data.fop==fop.value[0]) || (airline!=null && this.myrecordForm.value.data.carrier!=airline.value[0])  )
    {
      setTimeout(()=>{ this.closeAndOpenModal('precancel'); }, 4000);
     

    }/*else if(diffDays==1){
      
    }*/
    else{

      let pnrSrch = this._dataService.get()['pnrSrch'];
      let lnameSrch = this._dataService.get()['lnameSrch'];
      this._dataService.fetchRefund(pnrSrch, lnameSrch).subscribe((dataref: any) => {
    let refundAmount = dataref.refundAmount ;
    console.log(dataref);
    if(dataref.fullrefund){
    this._dataService.confirmCancel(pnrSrch, refundAmount).subscribe((data: any) => {
      if(data!=null)
      {
        if(data.status=="Success"){
          let viewRecord=this._dataService.get()['viewRecord'];
          viewRecord = Object.assign(viewRecord,{'refundAmount':refundAmount});
          this._dataService.setOption('viewRecord',viewRecord);
          setTimeout(()=>{
            this.closeAndOpenModal('fullrefund'); 
            setTimeout(()=>{
              this.modal.closeActive();
              setTimeout(()=>{
                this.router.navigate(['refund']);
              }, 1000);
            }, 2000);
        }, 500);
       

        }
      }
    });
   } else{
    this._dataService.setOption('viewRecord', this.myrecordForm.value.data);

    setTimeout(()=>{this.modal.closeActive(); this.router.navigate(['cancel']); }, 2000);

   }
  });













     
    }
   

  }
  closeAndOpenModal(msg:string){
    this.modal.closeActive(); this.modal.openVerticallyCentered(msg,'md','');
  }
  redirectToRoute(route) {
    this.router.navigate([route]);

  }
 
}
