import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../../_models/project';
import { ProjectService } from '../../_services/project.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Input } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { UserInfo } from '../../_models/userinfo';

@Component({
  selector: 'app-prj-usermodal',
  templateUrl: './project-user-modal.component.html',
  styleUrls: ['./project-user-modal.component.scss']
})
export class ProjectUserModalComponent implements OnInit{
  
  @Output() projectEdited  = new EventEmitter();
  closeResult: string;
  modalRef: NgbModalRef;
  usersOfProject: UserInfo[] = [];
  @Input() users: UserInfo[] = [];
  @Input() project: Project;

  constructor(private modalService: NgbModal,
               private projectService: ProjectService,
                private alertify: AlertifyService,
                 private authService: AuthService) {}

  ngOnInit(): void {
    this.getUsersOfProject(this.project.projectId);
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

  addUserToProject(userName:string)  {
    this.projectService.addUserToProject(userName,this.project).subscribe(() => {
      this.alertify.success('User added to project !');
      this.getUsersOfProject(this.project.projectId);
    },
      error => { this.alertify.error(error);
      }
    );
  }

  deleteUserToProject(userName:string)  {
    this.projectService.deleteUserToProject(userName,this.project).subscribe(() => {
      this.alertify.success('User deleted of project !');
      this.getUsersOfProject(this.project.projectId);
    },
      error => { this.alertify.error(error);
      }
    );
  }

  getUsersOfProject(projectId: number) {
    this.projectService.getUsersOfProject(projectId).subscribe((users:UserInfo[]) =>{
      this.usersOfProject = users;
    },
      error => { this.alertify.error(error);
      }
    );
    }

  }
