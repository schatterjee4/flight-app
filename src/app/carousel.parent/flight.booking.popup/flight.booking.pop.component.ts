import {Component, ViewEncapsulation, Optional, Input, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { FormService } from '../services/form.shared.service';

@Component({
  selector: 'ngbd-modal-options',
  templateUrl: './flight.booking.popup.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./flight.booking.popup.scss']
})
export class NgbdModalOptions {
  @Input() modaltype;
  @Input() size;
  @Input() data;
  myreissueForm: FormGroup;
  @Output() notifyParent = new EventEmitter();

 
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,private _dataService: FormService) {

    this.myreissueForm = this.fb.group({
      datefrom:''
    
    });
  }
  onSubmit() {
    this._dataService.updateReisueAmount().subscribe((data: any) => {
      if(data!=null)
      {
        if(data.status=="Success"){
          this.notifyParent.emit(data.price);
          this.activeModal.close('Notify click');
        }
      }
    });

  }
  
}
@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal-component.html'
})
export class NgbdModalComponent {
  modalRef :NgbModalRef;
  closeResult: String;

  constructor(private modalService: NgbModal) {}

  openVerticallyCentered( type?:any, size?:any, cssclass?:any, data?:any, eventEmitter?:Function) {
    this.modalRef = this.modalService.open(NgbdModalOptions, { backdrop : 'static',
    keyboard : false, windowClass: cssclass, centered:true});
    this.modalRef.componentInstance.modaltype = type;
    this.modalRef.componentInstance.size = size;
    this.modalRef.componentInstance.data=data;
    this.modalRef.componentInstance.notifyParent.subscribe(($e) => {
      console.log('$e', $e);
      if(eventEmitter){
        return eventEmitter($e);
      }
    });
    //modalRef.componentInstance.name = 'World';
   /* modalRef.componentInstance.data = {
      foo: 'bar',
      name: 'World'
    }*/
  }
  closeActive(){
    this.modalRef.close();
  }
}
