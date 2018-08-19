import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormService } from '../services/form.shared.service';
import { Flight } from '../models/flight.results.model';
import { FlightSearch } from '../models/flight.search.model';
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

@Component({
    selector: "flight-results",
    templateUrl: './flight.result.component.html',
    styleUrls: ['../carousel.parent.component.scss'],
})
export class FlightResultComponent implements OnInit {
    mydetailForm: FormGroup;
    outboundFlights: Flight[];
    inboundFlights: Flight[];
    flightsearchdata: FlightSearch;
    @Input() containername: string;
    //constructor(private carouselService: CarouselService) { }
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private _dataService: FormService
    ) { }
    ngOnInit() {
        if (this.containername !== undefined) {
            console.log(this.containername);
        }
        console.log(this._dataService.get());
        this.mydetailForm = this.fb.group({
            fareRouteTwo: '0',
            fareRouteOne: '0',
            fareRouteTwoVal: '0',
            fareRouteOneVal: '0',
            otTimeOne: '',
            dtTimeOne: '',
            otTimeTwo: '',
            dtTimeTwo: ''
        });

        this.flightsearchdata = this._dataService.get();
        if(this.flightsearchdata.datefrom!=null)
        {
            this.flightsearchdata.datefrom = this.flightsearchdata.datefrom['day']+' '+months[this.flightsearchdata.datefrom['month']]+' '+this.flightsearchdata.datefrom['year'];
        }
        if(this.flightsearchdata.dateto!=null && this._dataService.get()['triptype'] == 'two')
        {
            this.flightsearchdata.dateto = this.flightsearchdata.dateto['day']+' '+months[this.flightsearchdata.dateto['month']]+' '+this.flightsearchdata.dateto['year'];
        }
        console.log(this.flightsearchdata.datefrom);
        this
            ._dataService
            .getOutboundFlights(this._dataService.get()['origin']['key'], this._dataService.get()['dest']['key'])
            .subscribe((data: Object[]) => {
                if(data!=null)
                {
                    this.outboundFlights = data.map((flight: Object) => {
                        return {carrier :flight.basicFlightInfo.marketingCompany.identifier, startTime:flight.basicFlightInfo.flightDetails.departureTime, endTime:flight.basicFlightInfo.flightDetails.arrivalTime,carrierName :flight.basicFlightInfo.marketingCompany.identifier};
                    });
                }
                console.log(this.outboundFlights);

            });
        if (this._dataService.get()['triptype'] == 'two') {
            this
                ._dataService
                .getInboundFlights(this._dataService.get()['dest']['key'], this._dataService.get()['origin']['key'])
                .subscribe((data: Flight[]) => {
                    this.inboundFlights = data;
                });
       }

      //  this.mydetailForm.valueChanges.subscribe(console.log);
    }
    onSubmit() {
        if (this.mydetailForm.valid) {
            console.log("Form Submitted!");
        }
        this._dataService.setOption('totalPrice',parseInt(this.mydetailForm.value.fareRouteOneVal)+parseInt(this.mydetailForm.value.fareRouteTwoVal));
        this._dataService.setOption('otTimeOne', this.mydetailForm.value.otTimeOne);
        this._dataService.setOption('dtTimeOne', this.mydetailForm.value.dtTimeOne);

        console.log("Form entry!");
        this.router.navigate(['passengerdetails']);
    }
    updatePriceOne(val,otTime,dtTime) {
        this.mydetailForm.value.fareRouteOneVal=val.value;
        this.mydetailForm.value.otTimeOne=otTime.value;
        this.mydetailForm.value.dtTimeOne=dtTime.value;
    }
    updatePriceTwo(val) {
        this.mydetailForm.value.fareRouteTwoVal=val.value;

    }
}