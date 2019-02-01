

export class SearchResume {
    title: string;
    level: string;
    categoryIds: string[];
    locationIds: string[];

    constructor(data) {
        if (!data) {
            return;
        }
        this.title = data.title;
        this.level = data.level;
        this.categoryIds = data.categoryIds;
        this.locationIds = data.locationIds;
    }

}