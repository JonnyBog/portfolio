import React from 'react';

import { setupTestComponent } from '../../setupTests';
import ErrorMessage from '.';

const setupTest = setupTestComponent({
    render: () => <ErrorMessage>hey im an error</ErrorMessage>
});

describe('Components: ErrorMessage', () => {
    it('renders correct className on ErrorMessage', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find('[data-qa="error-message"]')).toHaveClassName(
            'error-message'
        );
    });

    it('renders an ErrorMessage with its children as a string', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find('[data-qa="text"]')).toHaveText('hey im an error');
    });

    it('renders correct data qa with the color red', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find('[data-qa="text"]')).toHaveClassName('red');
    });
});
