import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
    {path: '', component: MainComponent},

];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                initialNavigation: 'enabled'
            }
        ),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}