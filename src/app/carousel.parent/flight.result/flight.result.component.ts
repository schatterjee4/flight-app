import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormService,months } from '../services/form.shared.service';
import { Flight } from '../models/flight.results.model';
import { FlightSearch } from '../models/flight.search.model';

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
        this.mydetailForm = this.fb.group({
            fareRouteTwo: '0',
            fareRouteOne: '0',
            fareRouteTwoVal: '0',
            // tslint:disable-next-line:max-line-length
            fareRouteOneVal: '0' ,
            taxAirport:""+Math.floor(100 + 800 * Math.random()),
            taxFuel:""+Math.floor(100 + 800 * Math.random()),
            chargeService:""+Math.floor(100 + 800 * Math.random()),
            feesDevelopment:''+Math.floor(100 + 800 * Math.random()),
            otTimeOne: '',
            dtTimeOne: '',
            otTimeTwo: '',
            dtTimeTwo: '',
            totalPrice:'0'
        });
        this.mydetailForm.controls['totalPrice'].setValue(parseInt(this.mydetailForm.value.fareRouteOneVal)+parseInt(this.mydetailForm.value.fareRouteTwoVal)
        +parseInt(this.mydetailForm.value.taxAirport)
        +parseInt(this.mydetailForm.value.taxFuel)
        +parseInt(this.mydetailForm.value.chargeService)
        +parseInt(this.mydetailForm.value.feesDevelopment));
        console.log(this.mydetailForm.value.totalPrice);
        this.flightsearchdata = this._dataService.get();
        this._dataService.setOption('fareRouteOneVal', this.mydetailForm.value.fareRouteOneVal);
       this._dataService.setOption('fareRouteTwoVal', this.mydetailForm.value.fareRouteTwoVal);
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
            .subscribe((data:any[]) => {
                if(data!=null)
                {
                    this.outboundFlights = data.map((flight:any) => {
                        return {price:""+Math.floor(1000 + 800 * Math.random()),category:flight.additionalFlightInfo.flightDetails.numberOfStops==0?"NONSTOP":"",carrier :flight.basicFlightInfo.marketingCompany.identifier, startTime:flight.basicFlightInfo.flightDetails.departureTime.match(/.{1,2}/g).join(':'), endTime:flight.basicFlightInfo.flightDetails.arrivalTime.match(/.{1,2}/g).join(':'),carrierName :flight.basicFlightInfo.marketingCompany.identifier+" "+flight.basicFlightInfo.flightIdentification.number,source:flight.basicFlightInfo.departureLocation.cityAirport,destination:flight.basicFlightInfo.arrivalLocation.cityAirport,duration:flight.additionalFlightInfo.flightDetails.legDuration?flight.additionalFlightInfo.flightDetails.legDuration+"mins":""};
                    });
                }
              //  console.log(this.outboundFlights);

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
        }
       // this._dataService.setOption('totalPrice',parseInt(this.mydetailForm.value.fareRouteOneVal)+parseInt(this.mydetailForm.value.fareRouteTwoVal));
       // tslint:disable-next-line:max-line-length
       this.mydetailForm.controls['totalPrice'].setValue(parseInt(this.mydetailForm.value.fareRouteOneVal)+parseInt(this.mydetailForm.value.fareRouteTwoVal)
       +parseInt(this.mydetailForm.value.taxAirport)
       +parseInt(this.mydetailForm.value.taxFuel)
       +parseInt(this.mydetailForm.value.chargeService)
       +parseInt(this.mydetailForm.value.feesDevelopment));
       this._dataService.setOption('totalPrice', this.mydetailForm.value.totalPrice);
       this._dataService.setOption('taxFuel', this.mydetailForm.value.taxFuel);
       this._dataService.setOption('chargeService', this.mydetailForm.value.chargeService);
       this._dataService.setOption('feesDevelopment', this.mydetailForm.value.feesDevelopment);
       this._dataService.setOption('taxAirport', this.mydetailForm.value.taxAirport);
       this._dataService.setOption('fareRouteOneVal', this.mydetailForm.value.fareRouteOneVal);
       this._dataService.setOption('fareRouteTwoVal', this.mydetailForm.value.fareRouteTwoVal);

       
       
       
       this._dataService.setOption('otTimeOne', this.mydetailForm.value.otTimeOne);
        this._dataService.setOption('dtTimeOne', this.mydetailForm.value.dtTimeOne);

        console.log("Form entry!");
        console.log(this._dataService.get());

        this.router.navigate(['passengerdetails']);
    }
    updatePriceOne(val,otTime,dtTime, index) {
     //   this.mydetailForm.value.fareRouteOneVal=val.value;
        this.mydetailForm.controls['fareRouteOneVal'].setValue(val.value);
        console.log(this.mydetailForm.value.fareRouteOneVal);
        this.mydetailForm.controls['totalPrice'].setValue(parseInt(this.mydetailForm.value.fareRouteOneVal)+parseInt(this.mydetailForm.value.fareRouteTwoVal)
        +parseInt(this.mydetailForm.value.taxAirport)
        +parseInt(this.mydetailForm.value.taxFuel)
        +parseInt(this.mydetailForm.value.chargeService)
        +parseInt(this.mydetailForm.value.feesDevelopment));
        this.mydetailForm.value.otTimeOne=otTime.value;
        this.mydetailForm.value.dtTimeOne=dtTime.value;
        console.log(index.value);
        this._dataService.setOption('fareRouteOne',  this.outboundFlights[index.value]);
    }
    updatePriceTwo(val,index ) {
        this.mydetailForm.value.fareRouteTwoVal=val.value;
        this._dataService.setOption('fareRouteTwo',  this.inboundFlights[index.value]);


    }
}