// default values


// the name of the component
export const CMPNAME = 'react-vtable',
    // how many lines extra viewport up and down before virtualization ? 
    LINE_GAP = 10,

    // sizes
    WIDTH = 1200,
    HEIGHT = 800,
    ROW_HEIGHT = 80,
    
    // group component height 
    HEADER_CAPTION_HEIGHT = 25,
    FOOTER_CAPTION_HEIGHT = 25,

    COLUMN_WIDTH = 150,

    // id appended string
    RVT_ID = '_ID',

    // debouning values
    DEBOUNCE_SCROLLING = 50,
    DEBOUNCE_FILTERING = 50,

    // number of px of carpetheight over which the virtualization turn on (dynamically: filters)
    VIRTUALIZATION_CUTOFF = 100,

    // no data message
    NO_FILTER_DATA_MESSAGE = 'no data',

    // in case of a hidden column, this is the row content
    COMMON_REMOVED_CONTENT = '.';
