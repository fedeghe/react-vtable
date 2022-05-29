const replaceall = (tpl, obj, start, end, fb) => {
    start || (start = '__');
    end || (end = '__');

    const reg = new RegExp(start + '([A-z0-9-_]*)' + end, 'g');
    let straight = true;

    while (straight) {

        if (!(tpl.match(reg))) {
            return tpl;
        }
        // eslint-disable-next-line no-loop-func
        tpl = tpl.replace(reg,  (str, $1) => {
            if (typeof obj === 'function') {
                // avoid silly infiloops
                const tmp = obj($1);
                return (tmp !== start + $1 + end) ? obj($1) : $1;

            // the label matches a obj literal element
            // use it
            } else if ($1 in obj) {
                return obj[$1];
            }
            // not a function and not found in literal
            // use fallback if passed or get back the placeholder
            // switching off before returning
            straight = false;
            return typeof fb !== 'undefined' ? fb : start + $1 + end;
        });
    }
    return tpl;
},
isFunction = f => typeof f === 'function',
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
};

export {
    replaceall,
    isFunction,
    debounce
};
