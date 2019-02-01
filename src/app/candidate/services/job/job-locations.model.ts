export class JobLocations {
    public locationId: string;
    public locationName: string;
    public quantity: number;

    constructor(data) {
        if (!data) {
            return;
        }
        this.locationId = data.locationId;
        this.locationName = data.locationName;
        this.quantity = data.quantity;
    }
}