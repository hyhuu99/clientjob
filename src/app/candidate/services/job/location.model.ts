export class Location {
    public id: string;
    public name: string;
    constructor(data?: any) {
        if (!data) {
            return;
        }
        this.id = data.id;
        this.name = data.name;
    }
}
