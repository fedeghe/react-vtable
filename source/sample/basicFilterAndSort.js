
export const basicFilter = ({userValue, row, columnKey}) =>
        `${row[columnKey]}`.includes(userValue),

    basicSort = ({rowA, rowB, columnKey, direction}) => {
        const v = rowA[columnKey] > rowB[columnKey] ? 1 : -1;
        return {
            asc : v,
            desc: -v
        }[direction];
    };