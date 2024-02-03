import { Component, Input } from '@angular/core';
import { npcClass } from 'src/app/models';

@Component({
  selector: 'class-card',
  templateUrl: './classCard.component.html',
  styleUrls: [],
})
export class ClassCardComponent {
  @Input() classes: ReadonlyArray<npcClass> = [];
  classTableColumns: string[] = ['name', 'hitDie', 'userCreated'];

  newClass() {}

  viewClass(toView: npcClass) {}
}
