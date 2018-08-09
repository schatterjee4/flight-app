import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Flight } from '../models/flight.results.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FormService {
    data: any;
    http: Http;

    constructor(http: Http) {
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
        this.data =  this.get();
        this.data[option] = value;
        this.saveData(this.data);
    }
    get() {
        if(localStorage.getItem('currentUserData'))
        {
            this.data = JSON.parse(localStorage.getItem('currentUserData'));
        }
      
        return this.data;
    }
    saveData(data: Object){
        localStorage.setItem('currentUserData', JSON.stringify(data));

    }
 getOutboundFlights(orig:String, dest:String): Observable<Flight[]> {
        return this.http.get('../../assets/flight-outbound-results.json').pipe(
            map((res:Response) => (
               res.json().flightDetails.filter(items => items.source == orig && items.destination == dest )
            ))
          );
    } 
    getInboundFlights(orig:String, dest:String): Observable<Flight[]> {
        return this.http.get('../../assets/flight-inbound-results.json').pipe(
            map((res:Response) => (
               res.json().flightDetails.filter(items => items.source == orig && items.destination == dest )
            ))
          );
    } 

}