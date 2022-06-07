
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
    }],
    dimensions: {
        rowHeight:50,
        height:120,
        width:100
    }
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

To make it clear nothing is better than an example (you can still get a look at the `sample` folder and use `configBig.jsx` in use it in `source/Playground.jsx` then just run `yarn && yarn start`)
