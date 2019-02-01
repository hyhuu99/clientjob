import * as _ from 'lodash';

export default class ParseObjectHelper {
    public static parseObject(filter: object, unMapProperties: Array<string>) {
        const filterObject: any = {};
        _.forOwn(filter, function (value, key) {
            const publicKey = _.replace(key, '_', '');
            if (((Array.isArray(filter[publicKey]) && filter[publicKey].length > 0) ||
             (!Array.isArray(filter[publicKey]) && filter[publicKey]))
                && unMapProperties.indexOf(publicKey) === -1) {
                filterObject[publicKey] = filter[publicKey];
            }
        });
        return filterObject;
    }
}