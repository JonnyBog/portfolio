import React from 'react';

import { setupTestComponent } from '../../setupTests';
import Wrapper from '.';

const setupTest = setupTestComponent({
  render: () => (
    <Wrapper>
      <span>Text</span>
    </Wrapper>
  )
});

describe('Components: Wrapper', () => {
  it('renders its children', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="wrapper"] span')).toHaveText('Text');
  });

  it('renders Wrapper with data-qa', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="wrapper"]')).toExist();
  });

  it('renders correct className on Wrapper', () => {
    const { wrapper } = setupTest();
    expect(wrapper.find('[data-qa="wrapper"]')).toHaveClassName('wrapper');
  });
});
