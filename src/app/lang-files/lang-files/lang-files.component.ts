import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { LangFile } from '../lang-file';
import { LangFilesService } from '../lang-files.service';

@Component({
  selector: 'app-lang-files',
  templateUrl: './lang-files.component.html',
  styleUrls: ['./lang-files.component.scss']
})
export class LangFilesComponent implements OnInit {
  public error: boolean;
  public errorMsg: string;
  public loading: boolean;
  public success: boolean;
  public successMsg: string;
  public langFile: LangFile;
  @ViewChild('inputGroupFile') public inputGroupFile: ElementRef;
  public autosave: boolean;

  constructor (
    private langFilesService: LangFilesService
  ) { }

  // PRIVATE REGION
  private showError(errorMsg: string, time: number = null) {
    // showing error means loading is done
    this.loading = false;
    this.errorMsg = errorMsg;
    this.error = true;
    if (time) {
      const that = this;
      setTimeout(function () {
        that.hideError();
      }, time);
    }
  }
  private hideError() {
    this.error = false;
    this.errorMsg = null;
  }
  private showSuccess(successMsg: string, time: number = null) {
    // showing success means loading is done
    this.loading = false;
    this.successMsg = successMsg;
    this.success = true;
    if (time) {
      const that = this;
      setTimeout(function () {
        that.hideSuccess();
      }, time);
    }
  }
  private hideSuccess() {
    this.success = false;
    this.successMsg = null;
  }
  private resetAlerts() {
    // reset all alerts
    this.loading = true;
    this.hideError();
    this.hideSuccess();
  }
  // End of PRIVATE REGION

  ngOnInit() {
    // this is only for development of the design
    /*
    this.resetAlerts();
    this.langFilesService.getLangFilesDevOnly().then(
      result => {
        // console.log(result);
        this.langFile = result;
        this.showSuccess('Data loaded successfully', 5000);
      }, error => {
        console.log(error);
        this.showError('Could not load the given folder');
      }
    );*/
  }
  // load files from given folder
  public loadFilesFromFolder(event) {
    // reset all alerts
    this.resetAlerts();
    // check if Input element is accessible
    if (this.inputGroupFile && this.inputGroupFile.nativeElement) {
      if (!this.inputGroupFile.nativeElement.files || this.inputGroupFile.nativeElement.files.length === 0) {
        this.showError('No files in given directory');
        return;
      }
      this.langFilesService.getLangFiles(this.inputGroupFile.nativeElement.files[0].path).then(
        result => {
          console.log(result);
          this.langFile = result;
          this.showSuccess('Data loaded successfully', 5000);
        }, error => {
          console.log(error);
          this.showError('Could not load the given folder');
        }
      );
    } else {
      this.showError(null);
    }
  }
  // request data to be saved
  public requestSaveLangFile() {
    if (this.autosave) {
      this.saveLangFile();
    }
  }
  // save current state made by button
  public saveLangFile() {
    if (!this.autosave) {
      this.loading = true;
    }
    const dataToSave = [];
    for (const lang of this.langFile.langs) {
      dataToSave.push(
        this.langFilesService.saveLangFile(
          this.langFile.folderPath + '/' + lang + '.json',
          this.langFile.castDataToJson(lang))
      );
    }
    Promise.all(dataToSave).then(
      result => {
        if (!this.autosave) {
          this.showSuccess('Data saved successfully', 5000);
        }
      }, error => {
        console.log(error);
        this.showError('Could not save changes');
      }
    );
  }

}
