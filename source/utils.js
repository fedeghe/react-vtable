let id = 0
let strid = 0
const generators = {
    int: () => {
        return parseInt(Math.random() * 1000, 10)
    },
    str: () => {
        return `a random string ${++strid}`
    },
    date: () => {
        return `${new Date()}`
    },
    id: () => {
        return ++id
    }
}

const getType = (type, args=[]) => {
    return type in generators ? generators[type](...args) : 'no type'
}

export const generateRowData = (fields, num) => 
    Array.from({length: num}).map(() => 
        fields.reduce((acc, field) => {
            acc[field.key] = getType(field.type)
            return acc
        }, {})
    )

