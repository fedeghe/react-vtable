const TOGGLE_COLUMN_VISIBILITY= Symbol('toggle a table column visibility'),
    LOADING= Symbol('loading'),
    GLOBAL_FILTER= Symbol('filter globally'),
    FILTER= Symbol('filter'),
    UNFILTER= Symbol('unfilter'),
    SORT= Symbol('sort'),
    UNSORT= Symbol('unsort'),
    CELL_ENTER= Symbol('cell entered'),
    CELL_LEAVE= Symbol('cell left'),
    SCROLL= Symbol('scrolling');

// eslint-disable-next-line one-var
export const ACTION_TYPES = {
    TOGGLE_COLUMN_VISIBILITY,
    LOADING,
    GLOBAL_FILTER,
    FILTER,
    UNFILTER,
    SORT,
    UNSORT,
    CELL_ENTER,
    CELL_LEAVE,
    SCROLL,
};