import { Injectable } from '@angular/core';


@Injectable()
export class HeaderService {

  inkBar;
  constructor() {}

  hideInkBar() {
    this.inkBar.last._elementRef.nativeElement.nextElementSibling.style.visibility = 'hidden' ;
  }
}
