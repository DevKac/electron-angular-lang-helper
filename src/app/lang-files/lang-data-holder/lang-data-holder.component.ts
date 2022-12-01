import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { LangFile, LangData, LangTranslation } from '../lang-file';

@Component({
  selector: 'app-lang-data-holder',
  templateUrl: './lang-data-holder.component.html',
  styleUrls: ['./lang-data-holder.component.scss']
})
export class LangDataHolderComponent implements OnInit {
  @Input('langTranslations') public langTranslations: any[];
  @Input('listOfAllLangs') public listOfAllLangs: string[];
  @Output()dataNeedsSaving: EventEmitter<any> = new EventEmitter();
  public translationsNested: boolean;

  constructor() { }

  // PRIVATE REGION
  private updateDataFromServices() {
    // check which type of data is going to be rendered, nested or not
    this.translationsNested = null;
    if (this.langTranslations.length === 0) {
      this.translationsNested = true;
    }
    for (const translation of this.langTranslations) {
      if (this.isValueNestedData(translation)) {
        this.translationsNested = true;
      } else {
        if (this.translationsNested === true) {
          console.log('Error ' + LangDataHolderComponent + ': updateDataFromServices: translationNested changed value during updating');
        }
        this.translationsNested = false;
      }
    }
  }
  // check if given value is LangData or not
  private isValueNestedData(value: LangData | LangTranslation) {
    return (value instanceof LangData);
  }
  // emit event informing that data needs saving
  private saveData() {
    this.dataNeedsSaving.emit(true);
  }
  // End of PRIVATE REGION

  ngOnInit() {
    this.updateDataFromServices();
  }

  // PUBLIC REGION
  // add new value to current translations
  public addNewEmptyValue(nested: boolean) {
    const newValue = new LangData('NoName');
    if (nested) {
      newValue.langValue = [];
    } else {
      for (const lang of this.listOfAllLangs) {
        const newTrans = new LangTranslation(lang, 'No value');
        newValue.langValue.push(newTrans);
      }
    }
    this.langTranslations.push(newValue);
    this.saveData();
    this.updateDataFromServices();
  }
  // remove given LangData
  public removeTransation(translation: LangData) {
    const translationIndex = this.langTranslations.indexOf(translation);
    if (translationIndex === -1) {
      console.log('Error ' + LangDataHolderComponent.name + ': removeTransation could not find translation');
      return;
    }
    this.langTranslations.splice(translationIndex, 1);
    this.saveData();
    this.updateDataFromServices();
  }
  // open edit mode for translation
  public openEdit(translation: LangData | LangTranslation) {
    if (translation instanceof  LangTranslation) {
      translation.langValueBackUp = translation.langValue;
    }
    if (translation instanceof LangData) {
      translation.langKeyBackUp = translation.langKey;
    }
    translation.edit = true;
  }
  // cancel changes done during edit
  public cancelEdit(translation: LangData | LangTranslation) {
    if (translation instanceof  LangTranslation) {
      translation.langValue = translation.langValueBackUp;
      translation.langValueBackUp = null;
    }
    if (translation instanceof LangData) {
      translation.langKey = translation.langKeyBackUp;
      translation.langKeyBackUp = null;
    }
    translation.edit = false;
  }
  // save changes made to given translation
  public saveTranslation(translation: LangData | LangTranslation) {
    if (translation instanceof  LangTranslation) {
      translation.langValueBackUp = null;
    }
    if (translation instanceof LangData) {
      translation.langKeyBackUp = null;
    }
    translation.edit = false;
    this.saveData();
  }
  // catch and emit further event informing that data needs saving
  public callDataSaving() {
    this.saveData();
  }
  // End of PUBLIC REGION

}
