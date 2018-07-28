import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselParentComponent } from './carousel.parent.component';
import { CarouselModule } from './carousel/carousel.module';
import { BasicFormComponent } from "./form.component";
import { MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule } from '@angular/material';
import { FlightResultComponent } from "./flight.result/flight.result.component";
import {Routes, RouterModule} from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselSectionComponent } from './carousel.section.component';
import { FlightPaymentComponent} from './flight.payment/flight.payment.component';

//import { CarouselService } from './carousel.service';
const routes: Routes = [
    { path: '', component: CarouselSectionComponent, pathMatch: 'full' },
    { path: 'search', component: FlightResultComponent },
    { path: 'payment', component: FlightPaymentComponent }
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
        RouterModule.forRoot(routes,{ useHash: false })

    ],
    declarations: [
        CarouselParentComponent,
        BasicFormComponent,
        FlightResultComponent,
        CarouselSectionComponent,
        FlightPaymentComponent
    ],
    providers: [
        // CarouselService,
    ],



    exports: [CarouselParentComponent]
})
export class CarouselParentModule { }