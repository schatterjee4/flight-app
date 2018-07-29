import { Injectable } from '@angular/core';
import { HttpClient ,Http, Response } from '@angular/http';
import { Flight } from '../models/flight.results.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FormService {
    data: any;
    http: Http;

    constructor(http: HttpClient ) {
        this.http = http;
        console.log('Inside service');
        //this.config = this.http.get('/config.json');
        this.data = {
            fareRouteTwo: '',
            fareRouteOne: '',
            triptype: ' ',
            dest: '',
            origin: '',
            datefrom: '',
            dateto: '',
            adult: '',
            child: '',
            infant: ''
        }
        console.log(this.data['adult']);
    }
    setOption(option, value) {
        this.data[option] = value;
    }
    get() {
        return this.data;
    }
    getOutboundFlights(key:String): Observable<Flight[]> {
        return this.http.get('../../assets/flight-outbound-results.json')
        .pipe(map(res => <Flight[]>res.json()
                               .filter(<Flight>(x) => x.source==key)));
   }
   
   
}