import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from '../services/form.shared.service';

@Component({
    selector: 'app-flight-pax-component',
    templateUrl: './flight.pax.component.html',
    styleUrls: ['./flight.pax.component.scss']

})
export class PaxAccordionToggleComponent {
    myPaxForm: FormGroup;
    adultNos = [];
    childNos = [];
    infantNos = [];
    @Input() containername: string;
    //constructor(private carouselService: CarouselService) { }
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private _dataService: FormService
    ) { }

    ngOnInit() {
        this.myPaxForm = this.fb.group({
            adult: 5,//this._dataService.get()['adult'],
            child: 5,//this._dataService.get()['child'],
            infant: 5,//this._dataService.get()['infant'],
        })
        this.adultNos = Array(this.myPaxForm.value.adult * 1).fill(0).map((x, i) => i + 1);
        this.childNos = Array(this.myPaxForm.value.child * 1).fill(0).map((x, i) => i + 1);
        this.infantNos = Array(this.myPaxForm.value.infant * 1).fill(0).map((x, i) => i + 1);


        console.log(this.myPaxForm.value.adult);
        // alert(this._dataService.get()['totalPrice']);
        //  this.myPaymentForm.value.totalPrice = this._dataService.get()['totalPrice'];
        if (this.containername !== undefined) {
            console.log(this.containername);
        }

    }
}
