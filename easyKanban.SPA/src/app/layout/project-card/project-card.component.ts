import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { User } from '../../_models/user';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project;
  @Input() users: User[] = [];
  @Input() isOwner: boolean;
  @Output() projectEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onProjectAdded() {
    this.projectEvent.emit();
  }
}
