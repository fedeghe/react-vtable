/* eslint-disable one-var */
import React from 'react';

import VTable from '../source/VTable';
import bigConfig from '../source/configBig';
import smallConfig from '../source/configSmall';

export default {
  title: 'VTable/Use Cases',
  component: VTable,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = (args) => <div style={{ margin: 20 }}><VTable {...args} /></div>;

export const BigConfig = Template.bind({});
BigConfig.args = {
    config: bigConfig,
};

export const SmallConfig = Template.bind({});
SmallConfig.args = {
    config: smallConfig,
};
