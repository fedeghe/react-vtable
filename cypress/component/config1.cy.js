
import React from 'react';
import HyperTable from '../../source/HyperTable';
import generateRowData from '../../source/utils';

import { COLUMNS, DATASIZE, TABLEDIMENSIONS } from './const';

const baseConfigNoData = {
  columns: COLUMNS,
  data: [],
  dimensions: TABLEDIMENSIONS
},

 baseConfigWithData = {
    columns: COLUMNS,
    data: generateRowData([
        { key: 'id', type: 'int' },
        { key: 'entityid', type: 'id' },
        { key: 'name', type: 'str' },
        ], DATASIZE, true
    ),
    dimensions: TABLEDIMENSIONS,

    header: {
        height: 40,
    },

    // TODO: remove when scrolling logic for this test does not rely on it anymore
    debounceTimes: {
        scrolling: 0
    },
    events: { 
        shiftPageScroll: true 
    },
};

describe('HyperTable with config 1', () => {

  it('shows no data', () => {
    cy.viewport(TABLEDIMENSIONS.width, TABLEDIMENSIONS.height);
    cy.mount(<HyperTable config={baseConfigNoData} />);
    cy.contains('no data');
  });

  /* 
    The HyperTable shows 13 rows at once in/with the given viewport/dimensions.
    As the table 'virtualises' the rows we can not simply loop through all entries
    as Cypress will fail to find elements. This is why we need to scroll before
    checking for new elements using the tables shift arrow down next page feature.
    Triggering mouse wheel or scrolling didn't scroll correctly.
  */
  const ELEMENTS_IN_VIEWPORT = 13;

  it('shows data', () => {
    cy.viewport(TABLEDIMENSIONS.width, TABLEDIMENSIONS.height);
    cy.mount(<HyperTable config={baseConfigWithData} />);

    // make sure column headers are not rendered
    baseConfigWithData.columns.forEach(column => {
      cy.contains(column.key).should('exist');
    });

    // check that all data is rendered
    const chunkSize = ELEMENTS_IN_VIEWPORT;
    for (let i = 0; i < baseConfigWithData.data.length; i += chunkSize) {
      const chunk = baseConfigWithData.data.slice(i, i + chunkSize);

      chunk.forEach(row => {
        Object.keys(row).forEach(key => {
          cy.contains(row[key]).should('be.visible');
        });
      });          
      
      // TODO: try to trigger scrolling event instead of using page scroll feature
      cy.get('[data-cy="table"]').type('{shift}{downarrow}');
    }     
  });
});