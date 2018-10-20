import { NgModule } from '@angular/core';

import { OnlyNumbersDirective } from './only-numbers.directive';

@NgModule({
  declarations: [
    OnlyNumbersDirective,
  ],
  exports: [
    OnlyNumbersDirective,
  ],
})
export class OnlyNumbersModule {
}
