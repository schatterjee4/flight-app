import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormService } from "../services/form.shared.service";
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
@Component({
  selector: 'app-flight-booking-cancel-component',
  templateUrl: './flight.booking.cancel.component.html',
  styleUrls: ['./flight.booking.cancel.component.scss']
})

export class FlightBookingCancelComponent {
  data: any;
  origin:String;
  dest:String;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _dataService: FormService
  ) { }

  ngOnInit() {
    this.data = this._dataService.get();
    console.log(this.data);
    this.origin = this.data['origin'];
    console.log(this.origin);
    if(this.data.datefrom!=null)
    {
        this.data.datefrom = this.data.datefrom['day']+' '+months[this.data.datefrom['month']]+' '+this.data.datefrom['year'];
    }
    if(this.data.dateto!=null)
    {
        this.data.dateto = this.data.dateto['day']+' '+months[this.data.dateto['month']]+' '+this.data.dateto['year'];
    }
  }
  redirectToRoute(route) {
    this.router.navigate([route]);

  }

}
