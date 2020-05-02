import React from 'react';

import { setupTestComponent } from '../../setupTests';
import Image from '.';

const requiredProps = {
    src: 'test.png',
    alt: 'alt'
};

const setupTest = setupTestComponent({
    render: () => <Image {...requiredProps} />
});

describe('Components: Image', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    it('renders an image with correct data-src', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find('img')).toHaveProp('data-src', 'test.png');
    });

    it('renders an image with correct image', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find('img')).toHaveProp('src', 'test.png');
    });

    it('renders an image with alt', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find('img')).toHaveProp('alt', requiredProps.alt);
    });

    it('renders image with correct sources', () => {
        const { wrapper } = setupTest({
            props: {
                sources: [
                    {
                        srcSet: 'srcSet1',
                        width: 200
                    },
                    {
                        srcSet: 'srcSet2',
                        width: 300
                    }
                ]
            }
        });
        expect(wrapper.find('source').at(0)).toHaveProp('srcSet', 'srcSet1');
        expect(wrapper.find('source').at(0)).toHaveProp(
            'media',
            '(min-width: 200px)'
        );
        expect(wrapper.find('source').at(1)).toHaveProp('srcSet', 'srcSet2');
        expect(wrapper.find('source').at(1)).toHaveProp(
            'media',
            '(min-width: 300px)'
        );
    });

    it('renders a data-id', () => {
        const { wrapper } = setupTest({
            props: {
                dataId: 'my-image'
            }
        });
        expect(wrapper.find('picture[data-id="my-image"]')).toExist();
    });
});
