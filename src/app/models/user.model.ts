export class User {
    organizationName: String;
    myAddress: String;
    myTelephone: String;
    myEmail: String;
    myWeb: String;
    username: String;
    password: String;

    constructor(obj: Object = {}) {
      Object.assign(this, obj);
    }
}
