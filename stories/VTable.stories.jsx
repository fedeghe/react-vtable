/* eslint-disable one-var */
import React from 'react';

import VTable from '../source/VTable';
import fullConfig from '../source/configFullSized';
import basicConfig from '../source/configBasicSized';

export default {
  title: 'VTable/Use Cases',
  component: VTable,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = (args) => <div style={{ margin: 20 }}>
    <VTable {...args} />
</div>;

export const FullConfig = Template.bind({});
FullConfig.args = {
    config: fullConfig(1e3),
};

export const BasicConfig = Template.bind({});
BasicConfig.args = {
    config: basicConfig(1e3),
};
