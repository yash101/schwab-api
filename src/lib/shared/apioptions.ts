export class APIOptions {
  baseuri: string = 'https://api.schwabapi.com/v1';

  constructor(baseuri: string) {
    this.baseuri = baseuri;
  }

  getBaseUri() {
    return this.baseuri;
  }
}
