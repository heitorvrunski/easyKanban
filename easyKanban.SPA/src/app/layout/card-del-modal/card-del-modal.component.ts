import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../../_models/project';
import { CardService } from '../../_services/card.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Input } from '@angular/core';
import { Card } from '../../_models/card';

@Component({
  selector: 'app-card-del-modal',
  templateUrl: './card-del-modal.component.html',
  styleUrls: ['./card-del-modal.component.scss']
})
export class CardDelModalComponent {
  @Output() cardDeleted  = new EventEmitter();
  closeResult: string;
  modalRef: NgbModalRef;
  @Input() card: Card;

  constructor(private modalService: NgbModal, private cardService: CardService, private alertify: AlertifyService) {}

  open(content) {
    this.modalRef = this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
      this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  close() {
    this.modalRef.close();
  }

  delete() {
    this.cardService.deleteCard(this.card).subscribe(() => {
      this.alertify.success('Item deleted !');
      this.modalRef.close();
      this.cardDeleted.emit();
    },
      error => { this.alertify.error(error);
      }
    );
  }
  }
