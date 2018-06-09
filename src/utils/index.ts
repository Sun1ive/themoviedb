/* eslint-disable class-methods-use-this */

export default class {
  public static set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  public static get(key: string): any {
    const val = window.localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  }
  public static remove(key: string) {
    window.localStorage.removeItem(key);
  }
}
