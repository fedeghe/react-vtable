const isFunction = f => typeof f === 'function',
    debounce = (func, wait) => {
        let timeout,
            enabled = true;
        return (...params) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (!enabled) return;
                func(...params);
                enabled = false;
                setTimeout(() => enabled = true, wait);
            }, wait);
        };
    },
    escapeComma = r => `${r}`.replace(/,/g, '\\,'),
    removeID = (jsonData, rhtID) => jsonData.map(row => {
        var r = {...row};
        delete r[rhtID];
        return r;
    }),
    asCsv = (columns, jsonData, rhtID) => {
        const lines = [],
            keys = columns.map(c => c.key);
        lines.push(keys.join(','));
        removeID(jsonData, rhtID).forEach(row => {
            lines.push(keys.map(k => escapeComma(row[k])).join(','));
        });
        return lines.join("\n");
    },
    asJson = removeID;

export {
    isFunction,
    debounce,
    asCsv,
    asJson
};
