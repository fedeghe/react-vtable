
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
``` html
// and render
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

those component you will write will receive a lot of useful data and functions, just to mention wun: the "download as csv" function.

Additionally some other options allow to: 
- tune the number of rows rendered (around the wuns the user sees)
- tune the filtering and scrolling debounce times
- tune the column default width (150)
- specify onEnter, onLeave and onClick cell handlers
- enable line, column, cell and cross highlighting class to be used  
- show already sorted (wun column)
- prefilter (+ than wun column)

## try it
run `yarn && yarn start` and take a look at the `sample` folder, use&tune `configBig.jsx` in `source/Playground.jsx`.

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
            **this function is expected to return 1, 0 or -1**  
            ant it is mandatory if we want to use the _sort_ object passed to the _header_ and _footer_.  
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
            overriding value to show in the cells of the hidden columns; wins over _commonRemovedContent_ which wins over the default '-' value.  
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
    - _height_ \<integer\>
    - _caption_:  
        - _height_ \<integer\>
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
    expected to return the content to be rendered as a loader when the virtualized rows range changes; it will be automatically rendered in the center of the table.  
- _NoFilterData_ \<ƒunction\>  
    expected to retunr the content to be rendered when the filter produce no results; the content will automatically centered; this component will receive the following prop  
    ``` js
    total
    ```
    representing the size of *data*. The default is just a 'no data' string.  

- _RightMost_  \<ƒunction\>  
    it receives the following props:
    ``` js
    row, rowIndex, type, from, to
    ```
    this component is meant to return the content of a sticky column that will be rendered in the right
- _LeftMost_  \<ƒunction\>  
    it receives the following props:
    ``` js
    row, rowIndex, type, from, to
    ```
    this component is meant to return the content of a sticky column that will be rendered in the left
- _commonRemovedContent_ \<string\>  
    in case we use the _visibilist_ without spefifying on the column the _removedContent_, this will allow to overrive the default value '.'.  
- _defaultColumnWidth_ \<integer\>  
    each column have a default with of **150px**, this parameter allows to change that default value; still in each column is possible to set a specific value (will be always interpreted in pixel unit)


---  

WIP 

----  


- _cls_ \<object literal\>

    highlight: {
        rowHighlightClass: '',
        columnHighlightClass: ''
        crossHighlightClass: ''
        cellHightlightClass: ''
    },
    elements: {
        contentClass: '',
        cellClass: '',
        wrapperClass: ''
    }

- events: {
    onCellClick: (e, { row, column }) => {},
    onCellEnter: (e, { row, column }) => {},
    onCellLeave: (e, { row, column }) => {},
    onHeaderHighlight: false,
    onFooterHighlight: false,
    onLeftMostHighlight: false,
    onRightMostHighlight: false,
    shiftPageScroll: true
}

debounceTimes: {
    filtering:  default 50
    scrolling:  default 100
}

---
fedeghe 2022

