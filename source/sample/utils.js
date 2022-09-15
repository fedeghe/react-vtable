let id = 0,
    strid = 0;
const sameInt = 1,
    sameDate = +new Date(2000,1,1,1,1,1),
    generators = {
        int: (same = false, i) => same ? (sameInt + i) : parseInt(Math.random() * 1000, 10),
        str: (same = false, i) => `a random, string ${same ? i : ++strid}`,
        date: (same = false, i) => `${same ? new Date(sameDate+i) : new Date()}`,
        id: (same = false, i) => `${'ID' + (same ? i : ++id)}`
    },
    getType = (type, args = []) => 
        type in generators ? generators[type](...args) : 'no type',

    generateRowData = (fields, num, same = false) =>
        Array.from({ length: num }).map((_ , i) =>
            fields.reduce((acc, field) => {
                acc[field.key] = getType(field.type, [same, i]);
                return acc;
            }, {})
        );

export  default generateRowData ;
