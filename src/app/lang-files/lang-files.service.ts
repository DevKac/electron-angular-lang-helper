import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { FsService } from 'ngx-fs';

import { LangFile } from './lang-file';
import { enJSON } from '../../assets/test-resources/en';
import { plJSON } from '../../assets/test-resources/pl';

@Injectable({
  providedIn: 'root'
})
export class LangFilesService {

  constructor (
    private _electronService: ElectronService,
    private _fsService: FsService
  ) { }

  // PRIVATE REGION
  // End of PRIVATE FOLDER

  // PUBLIC REGION
  public getLangFiles(path: string): Promise<LangFile> {
    return new Promise((resolve, reject) => {
      const fs = this._fsService.fs as any;
      const langData = new LangFile(path);
      // check if foler path exists
      if (!fs.existsSync(path)) {
        reject('Error!!! Folder does not exist!');
      } else {
        fs.readdir(path, function (error, files) {
          // handling error
          if (error) {
            reject('Error!!! Unable to scan directory: ' + error);
          }
          // listing all files using forEach
          files.forEach(function (file) {
            // Do whatever you want to do with the file
            const filePath = path + '/' + file;
            const fileNameNoExtension = file.split('.').slice(0, -1).join('.');
            // console.log('File content is:');
            // console.log(JSON.parse(fs.readFileSync(filePath, 'utf8')));
            langData.fillDataFromJson(fileNameNoExtension, JSON.parse(fs.readFileSync(filePath, 'utf8')));
          });
          resolve(langData);
        });
      }
    });
  }
  public getLangFilesDevOnly(): Promise<LangFile> {
    return new Promise((resolve, reject) => {
      const langData = new LangFile('bla bla bla');
      langData.fillDataFromJson('en', enJSON);
      langData.fillDataFromJson('pl', plJSON);
      resolve(langData);
    });
  }
  public saveLangFile(path: string, data: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const fs = this._fsService.fs as any;
      fs.writeFile(
        path,
        JSON.stringify(data),
        function (error) {
          if (error) {
            reject('Error!!! Could not save file: ' + error);
          } else {
            resolve(true);
          }
        }
      );
    });
  }
  // End of PUBLIC REGION
}
