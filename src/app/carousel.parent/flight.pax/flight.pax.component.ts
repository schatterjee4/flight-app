import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { FormService } from "../services/form.shared.service";
import { PaxType } from "../models/flight.search.pax.model";
@Component({
  selector: "app-flight-pax-component",
  templateUrl: "./flight.pax.component.html",
  styleUrls: ["./flight.pax.component.scss"]
})
export class PaxAccordionToggleComponent {
  myPaxForm: FormGroup;
  adultNos: PaxType[] = [];
  childNos: PaxType[] = [];
  infantNos: PaxType[] = [];
  paxArray: PaxType[] = [];
  @Input() containername: string;
  //constructor(private carouselService: CarouselService) { }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _dataService: FormService
  ) { }

  ngOnInit() {

    this.adultNos = new Array<PaxType>(5 * 1).fill(new PaxType());
    /*for (let i = 0; i < this.myPaxForm.value.adult * 1; i++){
        let pax= new PaxType();
        pax.paxtype='adt';
      this.adultNos.push(pax);
    }*/
    this.adultNos.forEach(element => {
      console.log(element.paxtype);
      element.paxtype = 'adt';
      element.firstName = '';
    });

    this.childNos = Array(5 * 1).fill(new PaxType());;
    this.childNos.forEach(person => { person.paxtype = 'chd'; person.firstName = '' });
    this.infantNos = Array(5 * 1).fill(new PaxType());;
    this.infantNos.forEach(person => { person.paxtype = "inf" });
    this.paxArray = [
      ...this.adultNos,
      ...this.childNos,
      ...this.infantNos
    ];
    this.myPaxForm = this.fb.group({
      adult: 5, //this._dataService.get()['adult'],
      child: 5, //this._dataService.get()['child'],
      infant: 5, //this._dataService.get()['infant'],
      // paxArray: this.fb.array([this.initPax(this.paxArray)]),
      items: this.fb.array([])

    });
    this.addItem(this.paxArray);
    console.log(this.myPaxForm.controls.items);
    console.log(this.myPaxForm.value.items);

    this.myPaxForm.valueChanges.subscribe(console.log);    // alert(this._dataService.get()['totalPrice']);
    //  this.myPaymentForm.value.totalPrice = this._dataService.get()['totalPrice'];
    if (this.containername !== undefined) {
      console.log(this.containername);
    }
  }
  addItem(arr: PaxType[]) {
    const control = <FormArray>this.myPaxForm.controls['items'];
    arr.forEach(element => {
      control.push(this.createItem(element.paxtype));

    });
  }
  createItem(paxtype: String): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      paxType: paxtype
    });
  }
  initPax(arr: PaxType[]) {
    // initialize our address
    //  console.log(arr);
    const newArr = arr.map(person => {
      return this.fb.group({
        'paxtype': [person.paxtype],
        'firstName': ['']
      });
    });
    console.log(newArr)

    return newArr;
  }
  onSubmit() {
    if (this.myPaxForm.valid) {
      console.log("Form Submitted!");
    }
    console.log(this._dataService.get());

    console.log("Form entry!");
    this.router.navigate(['payment']);
  }
}


