let id = 0,
    strid = 0;
const sameInt = 12345678,
    sameDate = +new Date(2000,1,1,1,1,1),
    generators = {
        int: (same, i) => same ? sameInt + i : parseInt(Math.random() * 1000, 10),
        str: (same, i) => `a random string ${same ? i : ++strid}`,
        date: (same, i) => `${same ? new Date(sameDate+i) : new Date()}`,
        id: (same, i) => `${'ID' + same ? i : ++id}`
    },
    getType = (type, args = []) => 
        type in generators ? generators[type](...args) : 'no type',

    generateRowData = (fields, num, same) =>
        Array.from({ length: num }).map(() =>
            fields.reduce((acc, field, i) => {
                acc[field.key] = getType(field.type, same, i);
                return acc;
            }, {})
        );

// eslint-disable-next-line import/prefer-default-export
export  default generateRowData ;
