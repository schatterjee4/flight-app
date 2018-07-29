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
@NgModule({
  declarations: [
    AppComponent
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
