export class DropDown {
    id: string;
    name: string;
    constructor(data) {
        if (!data) {
            return;
        }
        this.name = data.name;
        this.id = data.id;
        if (data.id != null && data.name != null) {
            this.name = data.name;
            this.id = data.id;
        }
    }

}
