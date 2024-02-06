import { Component, EventEmitter, Input, Output } from '@angular/core';
import { npcClass } from 'src/app/models';

@Component({
  selector: 'class-card',
  templateUrl: './classCard.component.html',
  styleUrls: [],
})
export class ClassCardComponent {
  @Input() classes: ReadonlyArray<npcClass> = [];
  @Output() viewClass = new EventEmitter<npcClass>();
  @Output() newClass = new EventEmitter();
  classTableColumns: string[] = ['name', 'hitDie', 'userCreated'];
}
