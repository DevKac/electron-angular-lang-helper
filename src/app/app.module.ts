import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';
import { NgxFsModule } from 'ngx-fs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LangFilesComponent } from './lang-files/lang-files/lang-files.component';
import { LangDataHolderComponent } from './lang-files/lang-data-holder/lang-data-holder.component';

@NgModule({
  declarations: [
    AppComponent,
    LangFilesComponent,
    LangDataHolderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxElectronModule,
    NgxFsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
