import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import {FormService, states} from '../services/form.shared.service';
import { NgbdModalComponent } from '../flight.booking.popup/flight.booking.pop.component';

@Component({
  selector: 'app-flight-record-component',
  templateUrl: './flight.record.component.html',
  styleUrls: ['./flight.record.component.scss']
})
export class FlightRecordComponent  implements OnInit {
  title = 'app';
  myrecordForm: FormGroup;
  clickedItem:string;
    public model: any;
    public records: any;

  constructor(private fb: FormBuilder,private router: Router,private _dataService: FormService,  private  modal: NgbdModalComponent ) { }
  ngOnInit() {
    
    this.myrecordForm = this.fb.group({
     data:[]
    });
   let pnrSrch = this._dataService.get()['pnrSrch'];
   let lnameSrch = this._dataService.get()['lnameSrch'];
   this._dataService.fetchView(pnrSrch, lnameSrch).subscribe((data: any) => {
    this.myrecordForm.value.data = data;
    let origin = this.myrecordForm.value.data['source'];
    let originDescr = states.filter(v => v.key.toLowerCase().indexOf(origin.toLowerCase()) > -1).map((state) => state.value );
    let dest = this.myrecordForm.value.data['destination'];
    let destDescr = states.filter(v => v.key.toLowerCase().indexOf(dest.toLowerCase()) > -1).map((state) => state.value );
    this.myrecordForm.value.data['originDescr'] = originDescr;
    this.myrecordForm.value.data['destDescr'] = destDescr;

  });

    this.myrecordForm.valueChanges.subscribe(console.log);
  }
  onSubmit() {
    this.modal.openVerticallyCentered('precancelcheck','md');
   
    if(this.myrecordForm.value.data.fop=="pp"||this.myrecordForm.value.data.carrier=="EY")
    {
      setTimeout(()=>{ this.closeAndOpenModal(); }, 4000);
     

    }

  }
  closeAndOpenModal(){
    this.modal.closeActive(); this.modal.openVerticallyCentered('precancel','md');
  }
}