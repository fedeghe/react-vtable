let id = 0,
    strid = 0;
const generators = {
        int: () => parseInt(Math.random() * 1000, 10),
        str: () => `a random string ${++strid}`,
        date: () => `${new Date()}`,
        id: () => ++id
    },
    getType = (type, args = []) => 
        type in generators ? generators[type](...args) : 'no type',

    generateRowData = (fields, num) =>
        Array.from({ length: num }).map(() =>
            fields.reduce((acc, field) => {
                acc[field.key] = getType(field.type);
                return acc;
            }, {})
        );

// eslint-disable-next-line import/prefer-default-export
export  default generateRowData ;
