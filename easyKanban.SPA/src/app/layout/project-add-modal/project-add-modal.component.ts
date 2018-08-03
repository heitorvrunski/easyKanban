import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../../_models/project';
import { ProjectService } from '../../_services/project.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-prjmodal',
  templateUrl: './project-add-modal.component.html',
  styleUrls: ['./project-add-modal.component.scss']
})
export class ProjectAddModalComponent {
  @Output() projectAdded  = new EventEmitter();
  closeResult: string;
  modalRef: NgbModalRef;
  model: Project = {
    projectId: 0,
    isPublic: false,
    projectName: '',
    ts : new Date(),
    description: '',
    owner: 0
  };
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

  close() {
    this.modalRef.close();
  }

  add() {
    this.model.ts = new Date();
    this.projectService.addProject(this.model).subscribe(() => {
      this.alertify.success('Project created !');
      this.modalRef.close();
      this.projectAdded.emit();
    },
      error => { this.alertify.error(error);
      }
    );
  }
  }
