let count = 0;
const prefix = 'HYT_';
// eslint-disable-next-line one-var
export const uniqueID = {
        toString: () => {
            count += 1;
            return prefix + count;
        }
    },
    
    __getFillerHeights = ({
        fromRow, moreSpaceThanContent, carpetHeight,
        rowHeight, contentHeight, dataHeight,
        virtualization
    }) => {
        const headerFillerHeight = fromRow * rowHeight,
            footerFillerHeight = moreSpaceThanContent
                ? contentHeight - carpetHeight
                : carpetHeight - headerFillerHeight - dataHeight;
        
        return virtualization.verticalEnabled ? {
            headerFillerHeight: Math.max(headerFillerHeight, 0),
            footerFillerHeight: Math.max(footerFillerHeight, 0)
        } : {
            headerFillerHeight: 0,
            footerFillerHeight: 0
        };
    },

    __filter = (fls, originalData) => Object.keys(fls).reduce(
        (acc, filterK) => acc.filter(row => fls[filterK].value === '' || !fls[filterK].visibility || fls[filterK].filter({
            userValue: fls[filterK].value,
            row,
            columnKey: filterK
        })),
        originalData
    ),
    
    // must either match one of the specified user filter function 
    // either (in case no filter is specified) match column[key]
    __globalFilter = (value, columns, originalData) =>     
        originalData.filter(row => 
            columns.filter(column => isFunction(column.filter)).some(column => 
                column.filter({userValue: value, row, columnKey: column.key})
            ) 
            || columns.some(column => `${row[column.key]}`.includes(value))
        ),

    __cleanFilters = _filters => Object.keys(_filters).reduce((acc, k) => {
        acc[k] = {
            filter: _filters[k].filter,
            visibility: false,
            value: ''
        };
        return acc;
    }, {}),

    __sort = (what, _sorter, _sortingColumn, _sortingDirection) => _sorter
        ? [...what].sort((a, b) => _sorter({
            rowA: a, rowB: b,
            columnKey: _sortingColumn,
            direction: _sortingDirection
        }))
        : [...what],

    __updateVirtualization = ({currentData, virtualization}) => ({
        ...virtualization,
        verticalEnabled: currentData.length > virtualization.verticalCutoff
    }),
    __arrRep = (a, i, v) => {
        if (i === 0) return [v].concat(a.slice(1));
        if (i === a.length - 1) return a.slice(0, -1).concat(v);
        return [].concat(...(a.slice(0, i)), v, ...(a.slice(i + 1)));
    };