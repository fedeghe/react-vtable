
# react-hypertable

## install

`yarn add react-hypertable`

React-hypertable creates a true `<table>` without using problematic fake scrollbars. It renders only the very minimum amount of rows in the table, and starting from computing the height all rows would occupy creates a top and bottom _filling_ row with the right height so to allow the scrollbar to stay as if all elements were rendered. A constraint imposed by this approach is that every row will have a fixed height (defaulted to `80px`) and also the table size is settable (defaulted to `1200px * 800px`).  

The very minimum, but not that useful, config might look like the following:  

``` js
const config = {
    columns: [
        { key: 'name', },
        { key: 'surname', },
        { key: 'address', },
        { key: 'phoneNumber', }
    ],
    data: [{
        name: 'Federico', surname: 'Ghedina',
        address: 'far far away 666', phoneNumber: '+0123456789'
    }, {
        name: 'Joe', surname: 'Jackson',
        address: 'far far away 9066', phoneNumber: '+1234567890'
    }, {
        name: 'Jack', surname: 'Johnson',
        address: 'far far away 1066', phoneNumber: '+2345678901'
    }, {
        name: 'Uma', surname: 'Floorman',
        address: 'far far away 4066', phoneNumber: '+3456789012'
    }]
}
```  
and render
``` html
 <HyperTable config={config} />
```
No headers, no filter or sorting, nothing, just the data. This case is really basic and rarely could meet what we might expect and need from a table. The good new is that there are many many options that can quickly allow you to use :  
- headless sticky header and footer
- headless filters (multiple) available [header & footer]
- headless sort and unsort (single row) [header & footer]
- headless header and footer captions, getting a lot of useful informations
- headless sticky left and/or right column
- headless loader  
- headless no data component  
- headless column visibility toggler
- headless downloader (csv, json)

those component you will write will receive a lot of useful data and functions, just to mention wun: the "download as csv" function.

Additionally some other options allow to: 
- tune the number of rows rendered (around the wuns the user sees)
- tune the filtering and scrolling debounce times
- tune the column default width (150)
- specify onEnter, onLeave and onClick cell handlers
- enable line, column, cell and cross highlighting class to be used  
- show already sorted (wun column)
- prefilter (+ than wun column)
- tune a cut-off value for the virtualisation

---

## try it
run `yarn && yarn start`  
take a look at the `sample` folder  
in `source/Playground.jsx` use `configBig.jsx` and try to tune the configuration.

---

## full config prop

Follows the complete reference for the config prop: 

- **columns**: [column]  
    - column: object literal containing  
        - **key** \<string\>  
            this is the **very only mandatory** element that must be in the column literal and must have a correspondence in each _data_ array row.
        - _width_ \<integer\>  
            integer to override the general _defaultColumnWidth_ which is defaulted to 150  
        - _cell_ \<ƒunction\>  
            receiving
            ``` js 
            row, column
            ```  
            meant to decide to show something different from the row column
        - _header_ \<ƒunction\>  
            receiving
            ```js 
            column, columnIndex,
            filter: {
                value, setValue,
                visibility, setVisibility,
                isFiltering
            }  
            sort: {
                sortAsc, sortDesc, unSort,
                direction, isSorting
            }
            ```  
            meant to decide to show something different from the row key
        - _footer_ \<ƒunction\>  
            same as _header_
        
        - _filter_ \<ƒunction\>  
            the filtering ƒunction receiving:
            ``` js
            userValue, row, columnKey 
            ```  
            **this function is expected to return a boolean**  
            and it is mandatory if we want to use the _filter_ object passed to the _header_ and _footer_.
        - _sort_ \<ƒunction\>  
            the sorting ƒunction receiving:
            ``` js
            rowA, rowB, columnKey, direction
            ```  
            **this function is expected to return `1`, `0` or `-1`**  
            it is mandatory if we want to use the _sort_ object passed to the _header_ and _footer_.  
        - _isVisible_ \<boolean\>  
            a boolean to preset the visibility (needs the _visibilist_)
        - _visibilist_ \<ƒunction\>  
            a component that will receive the followinf props: 
            ```js
            visibility: {
                isVisible, setVisibility, column
            }
            ```  
            this is meant to allow to show a visibility toggler
        - _removedContent_ \<string\>  
            overriding value to show in the cells of the hidden columns; wins over _commonRemovedContent_ which wins over the default `-` value.  
        - _preSorted_ \<enum ['asc', 'desc']\>  
            sort at load the table sorted based on that column;  only the first column with this attribute will be effective.  
            values accepted: **'asc'** or **'desc'**  
        - _preFiltered_ \<string\>   
            a string to pre filter as if the user have set it

- **data** : [row, ...]  
    - row: object literal  
        it contains:  
        **as values** all data needed to display directly (or derive from) what we want to show in the table;  
        **as keys** it contains the madatory **key** values we set in the **columns**  

- _dimensions_ : object literal  
    - _height_ \<integer\>  
        the height of the table, defaults to 800px  
    - _width_ \<integer\>  
        the width of the table, defaults to 1200px  
    - _rowHeight_ \<integer\>  
        the height of the rows, defaults to 80px  

- _header_ ⬆️   
 _footer_ ⬇️  
 both object literals containing   
    - _height_ \<integer\>  default 0 => no show
    - _caption_:  
        - _height_ \<integer\> default 25px
        - _component_ \<ƒunction\>    
            gets the following props:   
            - _from_: the first index of *data* actually rendered   
            - _to_: the last index of *data* actually rendered  
            - _activeColumn_: and artificial column id, quite unuseful  
            - _activeColumnIndex_: the column index the user is hovering  
            - _activeRow_: the row object the user is hovering   
            - _activeRowIndex_: the index of the current row the user is hovering  
            - _filtered_: an integer of all the elements that are passing the filter  
            - _scrollTop_: an integer with the corrent scrollTop measure in px  
            - _unFilter_: a function to remove all filters  
            - _unSort_: a function to unSort (reset to original *data* order)  
            - _activeFiltersCount_: an integer of how many filters are active  
            - _isSorting_: a boolean that will be true if a sorter is active    
            - _isFiltering_: a boolean that will be true if any filter is active  
            - _loading_: a boolean that will be true only while a recomputation is running to get the new set to display  
            - _downloadJson_: a function to download the current set as JSON  
            - _downloadCsv_: a function to download the current set as csv  

    the default content for _header_ and _footer_ cells is the _column.key_ and this can be easily changed specifying the omonimous function in the the column setting.  

- _Loader_ \<ƒunction\>  
    component expected to return the content to be rendered as a loader when the virtualized rows range changes; it will be automatically rendered in the center of the table.  
- _NoFilterData_ \<ƒunction\>  
    expected to return the content to be rendered when the filter produce no results; the content will get automatically centered; this component will receive the following prop  
    ``` js
    total // the total number of elements in original data
    ```
    representing the size of *data*. The default is just a 'no data' string.  

- _RightMost_  \<ƒunction\>  
    it receives the following props:
    ``` js
    row, rowIndex, type, from, to
    ```
    this component is meant to return the content of a sticky column that will be rendered in the right.  
    `type` is a value in `['header', 'body', 'footer']`
- _LeftMost_  \<ƒunction\>  
    it receives the following props:
    ``` js
    row, rowIndex, type, from, to
    ```
    this component is meant to return the content of a sticky column that will be rendered in the left.  
    `type` is a value in `['header', 'body', 'footer']`
- _commonRemovedContent_ \<string\>  
    in case we use the _visibilist_ without spefifying on the column the _removedContent_, this will allow to overrive the default value '.'.  
- _defaultColumnWidth_ \<integer\>  
    each column have a default with of **150px**, this parameter allows to change that default value; still in each column is possible to set a specific value (will be always interpreted in pixel unit)



- _cls_ \<object literal\>  
    this is meant to allow to add some style both to some relevant elements and to the column,row, cell and cross on hover event:  
    ``` js
    highlight: {
        // if specified will apply the style to the hovered row
        rowHighlightClass: '',

        // if specified will apply the styles to the hovered column
        columnHighlightClass: '',

        // if specified will apply the style to the hovered row+column
        crossHighlightClass: '',

        // if specified will apply the style to the hovered cell
        cellHightlightClass: ''
    },
    elements: {  
        // if specified will be appied to a content wrapper into the <td> 
        contentClass: '',
        
        // if specified will be appied to the <td> 
        cellClass: '',

        // if specified will be appied to the body <tr> 
        rowClass: '',

        // if specified will be appied to the table wrapper
        wrapperClass: ''
    }
    ```  
    It's **crucial** that all those classes do not modify the size thus must not include `border, padding, height, width, etc...`  
    It's up to the user to make those classes reachable.

- _events_ \<object literal\>
    ``` js
    // self explanatory, as second param will get a literal containing the row and column
    onCellClick: (e, { row, column }) => {},
    onCellEnter: (e, { row, column }) => {},
    onCellLeave: (e, { row, column }) => {},

    // when wun of the cls.highlight is set by default the hovering styles will be applied only on the content hoveing, not by the header nor footer nor leftmost nor rightmost. Those flags can enable that behaviour.
    onHeaderHighlight: false,
    onFooterHighlight: false,
    onLeftMostHighlight: false,
    onRightMostHighlight: false,

    // allows to enable a event handler that on shift+arrowup|pageup and shift+arrowdown|pagedown will trigger a full page scroll
    shiftPageScroll: true
    ```

- _debounceTimes_ \<object literal\>  
    allows to tune the default debouncing times for filtering and scrolling; it may contain:  
    ``` js
    filtering:  defaulted 50
    scrolling:  defaulted 50
    ```
- _virtualization_ \<object literal\>  
    Contains some fine tuning parameters giving more control over the virtualization.
    - _verticalCutoff_  \<integer\>  
        This is defaulted to 100. When the filtered elements are less than this value, all rows will be rendered. When more it will be effective. Set it to 0 in case the virtualization mechanism should always be active.

- _rhtID_ \<string\>  
    by default each row gets an added index in a field by default called `_ID`. In case this clashes with your data pick something else and keep in mind it needs to be a valid object literal key.

## Todo's list

- [x] make the vertical virtualization optional through a cutoff value defaulted to 100. The user can change that value.  
    If the data bring more rows than the cutoff value then the virtualzation is effective otherwise it is not (switch effective also on filtering).

- [ ] add the column virtualization also with cutoff value defaulted to 20.

- [ ] allow a column search, which will behave as a filter and will be available in the _LeftMost_ and _RightMost_.

- [ ] groups: allow a _groupName_ and _grouper_ fields in the column;  _grouper_ allows to specify a function that will receive the full row and it is expected to return a boolean: if `true` then the row will be listed in a the group named as _groupName_.
---
---
---
MIT licensed - fedeghe 2022

