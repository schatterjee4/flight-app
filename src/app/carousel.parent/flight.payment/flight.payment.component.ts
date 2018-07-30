import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { FormService } from '../services/form.shared.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
    selector: 'app-flight-payment',
    templateUrl: './flight.payment.component.html',
    styleUrls: ['./flight.payment.component.scss'],
})
export class FlightPaymentComponent implements OnInit {
    myPaymentForm: FormGroup;

    @Input() containername: string;
    //constructor(private carouselService: CarouselService) { }
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private _dataService: FormService
    ) { }

    ngOnInit() {
        this.myPaymentForm = this.fb.group({
            totalPrice: this._dataService.get()['totalPrice']
        })
       // alert(this._dataService.get()['totalPrice']);
      //  this.myPaymentForm.value.totalPrice = this._dataService.get()['totalPrice'];
        if (this.containername !== undefined) {
            console.log(this.containername);
        }
        console.log(this.route.snapshot.data['type']);

    }
}