import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
    selector: "flight-results",
    templateUrl: './flight.result.component.html',
    styleUrls: ['../carousel.parent.component.scss'],
})
export class FlightResultComponent implements OnInit {
    mydetailForm: FormGroup;

    @Input() containername: string;
    //constructor(private carouselService: CarouselService) { }
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    
      ){}
    ngOnInit() {
        if (this.containername !== undefined) {
         console.log(this.containername);
        }
        console.log( this.route.snapshot.data['type']);
        this.mydetailForm = this.fb.group({
            fareRouteTwo: '',
            fareRouteOne: '',
            
           });
       
           this.mydetailForm.valueChanges.subscribe(console.log)
    }
    onSubmit() {
        if (this.mydetailForm.valid) {
          console.log("Form Submitted!");
        }
        console.log("Form entry!");
        this.router.navigate(['payment', { data: { type: this.mydetailForm.value } } ]);
      }
    
}