import {CmCityModel} from '@app/candidate/services/common/cmCity.model'
import {CmCountryModel} from '@app/candidate/services/common/cmCountry.model.ts'
export class CommonModel{
    id : string;
    city : Array<CmCityModel>;
    country : Array<CmCountryModel>;
    gender : object;
    relationship : object;
    constructor(data) {
        if (!data) {
            return;
        }
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.gender = data.gender;
        this.relationship = data.relationship;
    }
}