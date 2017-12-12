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
    location: {
        latitude: number;
        longitude: number;
    };
    description: string;
    attendance: [object];

    constructor(obj: Object = {}) {
      Object.assign(this, obj);
    }
}
