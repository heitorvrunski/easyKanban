import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../../_models/project';
import { ProjectService } from '../../_services/project.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-prj-editmodal',
  templateUrl: './project-edit-modal.component.html',
  styleUrls: ['./project-edit-modal.component.scss']
})
export class ProjectEditModalComponent {
  @Output() projectEdited  = new EventEmitter();
  closeResult: string;
  modalRef: NgbModalRef;
  @Input() project: Project;

  constructor(private modalService: NgbModal, private projectService: ProjectService, private alertify: AlertifyService) {}

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

  edit() {
    this.projectService.editProject(this.project).subscribe(() => {
      this.alertify.success('Project edited !');
      this.modalRef.close();
      this.projectEdited.emit();
    },
      error => { this.alertify.error(error);
      }
    );
  }
  }
