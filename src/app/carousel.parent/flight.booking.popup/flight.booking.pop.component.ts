import {Component, ViewEncapsulation} from '@angular/core';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-options',
  templateUrl: './flight.booking.popup.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./flight.booking.popup.scss']
})
export class NgbdModalOptions {
  closeResult: string;

  constructor(public activeModal: NgbActiveModal) {}

  
}
@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal-component.html'
})
export class NgbdModalComponent {
  constructor(private modalService: NgbModal) {}

  openVerticallyCentered() {
    const modalRef = this.modalService.open(NgbdModalOptions,{ size: 'md' });
    //modalRef.componentInstance.name = 'World';
   /* modalRef.componentInstance.data = {
      foo: 'bar',
      name: 'World'
    }*/
  }
}