export class Event {

    user_id: object;
    slogan: String;
    startDate: String;
    endDate: String;
    place: String;
    description: String;
    organizationName: String;
    myAddress: String;
    myTelephone: String;
    myEmail: String;
    myWeb: String;

    constructor(obj: Object = {}) {
      Object.assign(this, obj);
    }
}
