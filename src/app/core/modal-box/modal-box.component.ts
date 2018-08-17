import {
  Component,
  Inject,
} from '@angular/core';

import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.scss']
})

export class ModalBoxComponent {
  message: string;
  twoBtn: boolean;

  constructor(
    public dialogRef: MatDialogRef<ModalBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = this.data.message;
    this.twoBtn = this.data.twoBtn;
  }

  choose(choice: boolean) {
    this.dialogRef.close(choice);
  }
}
