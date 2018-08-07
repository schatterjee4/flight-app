import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselParentModule } from './carousel.parent/carousel.parent.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, fab);
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormService} from './carousel.parent/services/form.shared.service';
import { HttpModule } from '@angular/http';
import { FlightNavComponent } from './carousel.parent/flight.navigation/flight.navigation';
@NgModule({
  declarations: [
    AppComponent,
    FlightNavComponent

  ],
  imports: [
    BrowserModule,
    CarouselParentModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpModule

  ],
  providers: [FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
