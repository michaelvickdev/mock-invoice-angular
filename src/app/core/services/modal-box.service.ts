import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material';

import { ModalBoxComponent } from '../modal-box/modal-box.component';


@Injectable()
export class ModalBoxService {

  constructor(
    private dialog: MatDialog
  ) {}

  confirmModal(message: string, twoBtn: boolean = true) {
    return this.dialog.open(
      ModalBoxComponent,
      {
        data: {message: message, twoBtn: twoBtn},
      }
    )
    .afterClosed();
  }
}
