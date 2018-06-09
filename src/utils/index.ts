/* eslint-disable class-methods-use-this */

export default class {
  private key: string;
  private value: any;

  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  }
  private set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  private get(key: string): any {
    const val = window.localStorage.getItem(key);
    return val ? JSON.parse(val) : null;
  }
  private remove(key: string) {
    window.localStorage.removeItem(key);
  }
}
