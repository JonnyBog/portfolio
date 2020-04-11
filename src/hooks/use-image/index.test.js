/* eslint react/prop-types: 0 */
import React from 'react';

import { prependRequest } from '../../lib/constants';
import { setupTestComponent } from '../../setupTests';
import toDataURL from './to-data-url';
import useImage from '.';

jest.mock('./to-data-url');

function HookWrapper(props) {
    const hook = props.hook ? props.hook() : undefined;
    return <div hook={hook} />;
}

const image = 'test.png';

const setupTest = setupTestComponent({
    render: () => <HookWrapper hook={() => useImage(image)} />
});

describe('Hooks: useImage', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    it('returns a placeholder image initially', () => {
        toDataURL.mockImplementation(
            require.requireActual('./to-data-url').default
        );
        const { wrapper } = setupTest();
        const { hook } = wrapper.find('div').props();
        expect(hook).toEqual('placeholder.png');
    });

    it('returns the correct image once loaded', () => {
        setupTest();
        expect(toDataURL).toHaveBeenCalledWith(`${prependRequest}${image}`);
    });
});
