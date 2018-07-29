import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {FormService} from '../services/form.shared.service';
import { Flight } from '../models/flight.results.model';

@Component({
    selector: "flight-results",
    templateUrl: './flight.result.component.html',
    styleUrls: ['../carousel.parent.component.scss'],
})
export class FlightResultComponent implements OnInit {
    mydetailForm: FormGroup;
    outboundFlights: Flight[];
    inboundFlights: Flight[];

    @Input() containername: string;
    //constructor(private carouselService: CarouselService) { }
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private _dataService: FormService
      ){}
    ngOnInit() {
        if (this.containername !== undefined) {
         console.log(this.containername);
        }
        console.log(this._dataService.get());
        this.mydetailForm = this.fb.group({
            fareRouteTwo: '',
            fareRouteOne: ''
           });

           console.log(this._dataService.get()['origin']);
           this
           ._dataService
           .getOutboundFlights()
           .subscribe((data: Flight[]) => {
             this.outboundFlights = data;
         }) .filter(item => item.source === this._dataService.get()['origin']['key']) ;
           this.mydetailForm.valueChanges.subscribe(console.log)
    }
    onSubmit() {
        if (this.mydetailForm.valid) {
          console.log("Form Submitted!");
        }
        console.log("Form entry!");
        this.router.navigate(['payment']);
      }
    
}