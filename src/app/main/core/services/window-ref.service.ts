import { Injectable } from '@angular/core';

function getWindow (): any {
  return window;
}

@Injectable()

export class WindowRef {
  get native (): any {
    return getWindow();
  }
}