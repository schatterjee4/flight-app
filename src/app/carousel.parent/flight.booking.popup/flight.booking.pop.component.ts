import {Component, ViewEncapsulation, Optional} from '@angular/core';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-options',
  templateUrl: './flight.booking.popup.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./flight.booking.popup.scss']
})
export class NgbdModalOptions {
  closeResult: String;
  modaltype:String;
  constructor(public activeModal: NgbActiveModal,@Optional()modaltype: String) {
    this.modaltype= modaltype;
  }

  
}
@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal-component.html'
})
export class NgbdModalComponent {
  constructor(private modalService: NgbModal) {}

  openVerticallyCentered(@Optional() type:any) {
    const modalRef = this.modalService.open(NgbdModalOptions,{ size: 'lg', modaltype: type});
    //modalRef.componentInstance.name = 'World';
   /* modalRef.componentInstance.data = {
      foo: 'bar',
      name: 'World'
    }*/
  }
}
