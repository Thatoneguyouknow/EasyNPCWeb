import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { npc } from "src/app/models";

@Component({
    selector: 'char-edit-dialog',
    templateUrl: './charEditDialog.component.html',
    styleUrls: ['./charEditDialog.component.scss']
})
export class CharEditDialogComponent {
    constructor (public dialogRef: MatDialogRef<CharEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: npc) {}

    closeDialog() {
        this.dialogRef.close();
    }

}