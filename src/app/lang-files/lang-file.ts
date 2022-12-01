import { BasicObject } from '../shared/abstracts/basic-object';
import {isNullOrUndefined} from "util";

// main class holding all langs and data
export class LangFile extends BasicObject {
  // list of all langs
  public langs: string[];
  // array with translations
  public translations: LangData[];
  // information from which folder is data
  public folderPath: string;

  constructor(folderPath: string) {
    super();
    this.langs = [];
    this.translations = [];
    this.folderPath = folderPath;
  }

  public fillDataFromJson(langName: string, json: any) {
    // add new lang to the list of all langs, todo: add detection if lang already added
    this.langs.push(langName);
    Object.keys(json).forEach(key => {
      // flag checking if we are adding new key or just editing
      let addNew = false;
      // check if value with such key was already added
      let newData = this.findObjectByKey(key);
      if (newData === null) {
        // value with such key does not exists, add new object
        addNew = true;
        newData = new LangData(key);
      }
      // fill with data
      newData.fillDataFromJson(langName, json[key]);
      if (addNew) {
        // value with such key does not exists, add new object
        this.translations.push(newData);
      }
    });
    // fill up missing translations
    for (const lang of this.langs) {
      this.fillMissingTranslations(lang);
    }
  }
  public castDataToJson(lang: string): object {
    // check if lang is defined
    if (isNullOrUndefined(lang)) {
      console.log('Error, ' + LangFile.name + ': castDataToJson has no lang');
      return null;
    }
    // fill object with data
    const jsonData = {};
    for (const trans of this.translations) {
      jsonData[trans.langKey] = trans.castDataToJson(lang);
    }
    // return object
    return jsonData;
  }
  public findObjectByKey(key: string) {
    for (const elem of this.translations) {
      if (elem.langKey === key) {
        return elem;
      }
    }
    return null;
  }
  public fillMissingTranslations(langKey: string) {
    for (const translation of this.translations) {
      translation.fillMissingTranslations(langKey);
    }
  }

}

export class LangData extends BasicObject {
  // key of this data
  public langKey: string;
  // back up for lang key
  public langKeyBackUp: string;
  // value of this data. Can be array of LangData in case of nested values or array of LangTranslation
  public langValue: any[];
  // is it being currently editted in FE
  public edit: boolean;

  constructor(key: string) {
    super();
    this.langKey = key;
    this.langValue = [];
    this.edit = false;
  }

  public fillDataFromJson(langName: string, json: any) {
    if (this.isValueAnObject(json)) {
      Object.keys(json).forEach(key => {
        let addNew = false;
        let newData = this.findObjectByKey(key);
        if (newData === null) {
          addNew = true;
          newData = new LangData(key);
        }
        newData.fillDataFromJson(langName, json[key]);
        if (addNew) {
          this.langValue.push(newData);
        }
      });
    } else {
      this.langValue.push(new LangTranslation(langName, json));
    }
  }
  public castDataToJson(lang: string): object | string {
    // check if lang is defined
    if (isNullOrUndefined(lang)) {
      console.log('Error, ' + LangData.name + ': castDataToJson has no lang');
      return null;
    }
    // fill object with data
    let jsonData = {};
    for (const trans of this.langValue) {
      if (trans instanceof LangData) {
        jsonData[trans.langKey] = trans.castDataToJson(lang);
      } else {
        const result = trans.castDataToJson(lang);
        if (result != null) {
          jsonData = result;
        }
      }
    }
    // return object
    return jsonData;
  }
  public findObjectByKey(key: string) {
    for (const elem of this.langValue) {
      if (elem.langKey === key) {
        return elem;
      }
    }
    return null;
  }
  public isValueAnObject(json = null): boolean {
    if (!json) {
      json = this.langValue;
    }
    return (typeof json === 'object');
  }
  public fillMissingTranslations(langKey: string) {
    // check if it's a branch of leaf Data
    if (this.langValue.length && this.langValue[0] instanceof LangData) {
      // if it is branch call fill function on children
      for (const translation of this.langValue) {
        translation.fillMissingTranslations(langKey);
      }
    } else {
      // it is a leaf object
      let langPresent = false;
      for (const translation of this.langValue) {
        if (translation.langKey === langKey) {
          // translation is present, no need to add it
          langPresent = true;
        }
      }
      if (!langPresent) {
        this.langValue.push(new LangTranslation(langKey, null));
      }
    }
  }
}

// single translation like 'en': 'hello world'
export class LangTranslation extends BasicObject {
  // for which lang is this translation, like 'en' or 'pl'
  public langKey: string;
  // translation, like 'hello world
  public langValue: string;
  // back up for this lang value;
  public langValueBackUp: string;
  // is it being currently editted in FE
  public edit: boolean;

  constructor(langKey: string, langValue: string) {
    super();
    this.langKey = langKey;
    this.langValue = langValue;
    this.edit = false;
  }

  public fillDataFromJson(data: any) {
    // todo: anything?
  }
  public castDataToJson(lang: string): string {
    // check if lang is defined
    if (isNullOrUndefined(lang)) {
      console.log('Error, ' + LangTranslation.name + ': castDataToJson has no lang');
      return null;
    }
    // return translation if lang is matching
    if (this.langKey === lang) {
      return this.langValue;
    } else {
      return null;
    }
  }
}
