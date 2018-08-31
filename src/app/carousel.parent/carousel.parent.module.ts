import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule,NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselParentComponent } from './carousel.parent.component';
import { CarouselModule } from './carousel/carousel.module';
import { BasicFormComponent } from "./form.component";
import { MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { FlightResultComponent } from "./flight.result/flight.result.component";
import {Routes, RouterModule} from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselSectionComponent } from './carousel.section.component';
import { FlightPaymentComponent} from './flight.payment/flight.payment.component';
import {PaxAccordionToggleComponent} from './flight.pax/flight.pax.component';
import { FlightBookingComponent } from './flight.booking/flight.booking';
import { BasicViewFormComponent } from './form.view/form.view.component';
import { SharedModule } from './flight.booking.popup/flight.booking.popup.module';
import { NgbdModalComponent, NgbdModalOptions } from './flight.booking.popup/flight.booking.pop.component';
import { FlightRecordComponent } from './flight.records/flight.record.component';
import {FlightCancelRefComponent} from './flight.booking.cancel.refund/flight.booking.cancel.refund';

//import { CarouselService } from './carousel.service';
const routes: Routes = [
    { path: '', component: CarouselSectionComponent, pathMatch: 'full' },
    { path: 'search', component: FlightResultComponent },
    { path: 'payment', component: FlightPaymentComponent },
    { path : 'passengerdetails' ,component: PaxAccordionToggleComponent},
    {path : 'bookingdetails', component:FlightBookingComponent},
    {path: 'cancel', component:FlightCancelRefComponent},
    {path: 'view', component:FlightRecordComponent}
   ];

@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        NgbModule.forRoot(),
        CarouselModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        NgbAccordionModule,
        RouterModule.forRoot(routes,{ useHash: false })

    ],
    declarations: [
        CarouselParentComponent,
        BasicFormComponent,
        FlightResultComponent,
        CarouselSectionComponent,
        FlightPaymentComponent,
        PaxAccordionToggleComponent,
        FlightBookingComponent,
        FlightCancelRefComponent,
        BasicViewFormComponent,
        FlightRecordComponent

    ],
  


    exports: [CarouselParentComponent]
})
export class CarouselParentModule { }