import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormService } from "../services/form.shared.service";
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
@Component({
  selector: 'app-flight-booking-cancel-component',
  templateUrl: './flight.booking.cancel.component.html',
  styleUrls: ['./flight.booking.cancel.component.scss']
})

export class FlightCancelledComponent {
  data: any;
  origin:String;
  dest:String;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _dataService: FormService
  ) { }

  ngOnInit() {
    this.data = this._dataService.get()['viewRecord'];
  }
  redirectToRoute(route) {
    this.router.navigate([route]);

  }

}
