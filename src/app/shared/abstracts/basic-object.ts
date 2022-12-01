export abstract class BasicObject {
  // each object must be able to load it's data from json from BE
  public abstract fillDataFromJson(langName: string, json: any);
  // each object must be able to cast it's data into body to be sent to BE
  public abstract castDataToJson(langName: string): object | string;
}
