import { Component, OnInit, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { FormService } from '../services/form.shared.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbdModalOptions, NgbdModalComponent } from '../flight.booking.popup/flight.booking.pop.component';


@Component({
    selector: 'app-flight-payment',
    templateUrl: './flight.payment.component.html',
    styleUrls: ['./flight.payment.component.scss'],
    
})
export class FlightPaymentComponent implements OnInit {
    myPaymentForm: FormGroup;
    pnr:string;
    points:number;
    remainingPoints:Number;
    multiplier:number;
    check: boolean;
    disabled:String;
    ccNumber:String;
    @Input() containername: string;
    //constructor(private carouselService: CarouselService) { }
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private _dataService: FormService,
        private  modal: NgbdModalComponent 

    ) { }

    ngOnInit() {
        this.myPaymentForm = this.fb.group({
            totalPrice: this._dataService.get()['totalPrice'],
            fop:'cc',
            ccLasttFour:'',
            ccLength:0
        });
        this.points=0;
        this.remainingPoints=0;
        this.multiplier=Math.floor(Math.random() * 100);
        this.check=false;
       // alert(this._dataService.get()['totalPrice']);
      //  this.myPaymentForm.value.totalPrice = this._dataService.get()['totalPrice'];
        if (this.containername !== undefined) {
            console.log(this.containername);
        }
    }
    onSubmit() {
        this.pnr =  this.makeid();
        this._dataService.setOption('fop',  this.myPaymentForm.value.fop);
        setTimeout(() => {this.modal.openVerticallyCentered('loader','md','loader')});

        this._dataService.savePnr().subscribe((data:any) => {
            if(data!=null)
            {
                this.modal.closeActive();
                this._dataService.setOption("bookingRef", data.pnr);
                this.modal.openVerticallyCentered(null,'md','');

                    this.router.navigate(['bookingdetails']);
               
            }
          //  console.log(this.outboundFlights);

        },
        complete => {
          console.log('done');
          this.modal.closeActive();
         
        });
     
    }
    makeid() {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        for (let i = 0; i < 5; i++){
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
      
        return text;
      }
      generatePoints(price)
      {
          this.points = price*1 + (this.multiplier * 1);
          this.remainingPoints = 0;
      }
      updatePoints(price,event)
      {
        if ( event.target.checked ) {
            this.points = this.points - price*1 ;
            this.check = true;
        }else{
            this.points = price*1 + (this.multiplier * 1);
            this.check=false;
        }
      }
      ccFormat(event: any) {
        var v =  this.ccNumber.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        var matches = v.match(/\d{4,16}/g);
        var match = matches && matches[0] || ''
        var parts = []
        var len=match.length;
        for (let i= 0; i<len; i+=4) {
            parts.push(match.substring(i, i+4));
        }
    
        if (parts.length) {
            this.ccNumber= parts.join(' ');
        } 
          return  this.ccNumber;
        
    }


}
