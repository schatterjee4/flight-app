import {Component, ViewEncapsulation} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-options',
  templateUrl: './flight.booking.popup.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NgbdModalOptions {
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  openVerticallyCentered(content) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

}