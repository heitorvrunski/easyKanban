import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from '../../_services/alertify.service';
import { Card } from '../../_models/card';
import { FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';
import { CardService } from '../../_services/card.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-card-add-modal',
  templateUrl: './card-add-modal.component.html',
  styleUrls: ['./card-add-modal.component.scss']
})
export class CardAddModalComponent implements OnInit {
  @Output() cardAdded  = new EventEmitter();
  projectId: number;
  closeResult: string;
  modalRef: NgbModalRef;
  formCard: FormGroup;
  model: Card = {
    cardDescription: '',
    cardId: 0,
    cardStatus: 'TODO',
    cardType: 'Low',
    ts: new Date()
  };
  constructor(private modalService: NgbModal,
               private alertify: AlertifyService,
                private formBuilder: FormBuilder,
                  private cardService: CardService,
                    private actRoute: ActivatedRoute) {}

  ngOnInit() {
    this.projectId = this.actRoute.snapshot.params.projectId;
    this.formCard = this.formBuilder.group({
      cardDescription: ['', Validators.required],
      cardType: ['', Validators.required],
      cardStatus: ['', Validators.required],
    });
  }

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

  add(formCard: NgForm) {
    this.model = {...this.model, ...this.formCard.value};
    this.cardService.addCard(this.model, this.projectId).subscribe(() => {
      this.alertify.success('Card added sucessfully !');
      this.modalRef.close();
      this.cardAdded.emit();
    },
      error => { this.alertify.error(error);
      }
    );
  }
}
