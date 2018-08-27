import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Flight } from '../models/flight.results.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export const states = [{"key":"JFK","value":"New York"},{"key":"CCU","value":"Kolkata"},{"key":"DEL","value":"Delhi"},{"key":"ZRH","value":"Zurich"},{"key":"DXB","value":"Dubai"}];

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
 getOutboundFlights(orig:String, dest:String): Observable<any[]> {
         //this.http.get('../../assets/flight-outbound-results.json')
        const responseOutbound = this.http.get('../../assets/airmultiavailability.json').pipe(
        //const responseOutbound = this.http.get('http://104.42.45.156:3000/api/v1.0/airmultiavailability?type=1').pipe(
            map((res:Response) => (
                console.log( res.json()),
               // tslint:disable-next-line:max-line-length
               res.json().flightInfo.filter(items => items.basicFlightInfo.departureLocation.cityAirport == orig && items.basicFlightInfo.arrivalLocation.cityAirport == dest )
            ))
          );
         // console.log(this.http.get('http://104.42.45.156:3000/api/v1.0/airmultiavailability?type=1'));
          return responseOutbound;
    } 
    getInboundFlights(orig:String, dest:String): Observable<Flight[]> {
        return this.http.get('../../assets/flight-inbound-results.json').pipe(
            map((res:Response) => (
               res.json().flightDetails.filter(items => items.source == orig && items.destination == dest )
            ))
          );
    } 
    fetchView(pnr, lname): Observable<any> {
        return this.http.get('http://localhost:3000/fetchDetails?lname='+lname+'&pnr='+pnr).pipe(
            map((res:Response) => (
                res.json()
            ))
          );
    } 

    
}