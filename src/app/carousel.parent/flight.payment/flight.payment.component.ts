import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';


@Component({
    selector: 'app-flight-payment',
    templateUrl: './flight.payment.component.html',
    styleUrls: ['./flight.payment.component.scss'],
})
export class FlightPaymentComponent implements OnInit {
    
    @Input() containername: string;
    //constructor(private carouselService: CarouselService) { }
    constructor(
        private route: ActivatedRoute,
        private router: Router
      ){}
    ngOnInit() {
        if (this.containername !== undefined) {
         console.log(this.containername);
        }
        console.log( this.route.snapshot.data['type']);

    }
}