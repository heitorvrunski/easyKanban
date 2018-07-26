import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Project } from '../../_models/project';
import { Input } from '@angular/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project;
  @Output() projectEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onProjectAdded() {
    this.projectEvent.emit();
  }
}
