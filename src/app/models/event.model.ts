export class Event {

    user_id: object;
    slogan: string;
    startDate: string;
    endDate: string;
    place: string;
    description: string;
    organizationName: string;
    myAddress: string;
    myTelephone: string;
    myEmail: string;
    myWeb: string;

    constructor(obj: Object = {}) {
      Object.assign(this, obj);
    }
}
