import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselParentComponent } from './carousel.parent.component';
import { CarouselModule } from './carousel/carousel.module';
import { BasicFormComponent } from "./form.component";
import { MatInputModule, MatSelectModule, MatButtonModule, MatCheckboxModule } from '@angular/material';

import { ReactiveFormsModule } from '@angular/forms';

//import { CarouselService } from './carousel.service';


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
        ReactiveFormsModule
    ],
    declarations: [
        CarouselParentComponent,
        BasicFormComponent
    ],
    providers: [
        // CarouselService,
    ],



    exports: [CarouselParentComponent]
})
export class CarouselParentModule { }