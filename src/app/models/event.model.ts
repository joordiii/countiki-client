export class Event {

    user_id: {
        organizationName: string;
        myAddress: string;
        myTelephone: string;
        myEmail: string;
        myWeb: string;
    };
    slogan: string;
    startDate: string;
    endDate: string;
    place: string;
    description: string;

    constructor(obj: Object = {}) {
      Object.assign(this, obj);
    }
}
