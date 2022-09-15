
export const basicFilter = ({userValue, row, headerKey}) =>
        `${row[headerKey]}`.includes(userValue),

    basicSort = ({rowA, rowB, headerKey, direction}) => {
        const v = rowA[headerKey] > rowB[headerKey] ? 1 : -1;
        return {
            asc : v,
            desc: -v
        }[direction];
    };