export const replaceall = (tpl, obj, start, end, fb) => {
    start || (start = '__');
    end || (end = '__');

    var reg = new RegExp(start + '([A-z0-9-_]*)' + end, 'g'),
        straight = true,
        str, tmp;

    while (straight) {

        if (!(tpl.match(reg))) {
            return tpl;
        }
        tpl = tpl.replace(reg, function (str, $1) {
            switch (true) {
                // 
                case typeof obj === 'function' :
                    // avoid silly infiloops
                    tmp = obj($1);
                    return (tmp !== start + $1 + end) ? obj($1)  : $1;
                break;

                // the label matches a obj literal element
                // use it
                case $1 in obj : return obj[$1]; break;

                // not a function and not found in literal
                // use fallback if passed or get back the placeholder
                // switching off before returning
                default:
                    straight = false;
                    return typeof fb !== 'undefined' ?  fb : start + $1 + end;    
                break;
            }
        });
    }
    return tpl;
}
