export class JobCategories {
    public categoryId: string;
    public categoryName: string;
    public quantity: number;

    constructor(data) {
        if (!data) {
            return;
        }
        this.categoryId = data.categoryId;
        this.categoryName = data.categoryName;
        this.quantity = data.quantity;
    }
}