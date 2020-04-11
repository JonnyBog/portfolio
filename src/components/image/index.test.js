import React from 'react';

import { setupTestComponent } from '../../setupTests';
import useImage from '../../hooks/use-image';
import Image from '.';

jest.mock('../../hooks/use-image');

const requiredProps = {
    src: 'src',
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
    it('renders an image with placeholder src on render', () => {
        useImage.mockImplementation(
            require.requireActual('../../hooks/use-image').default
        );
        const { wrapper } = setupTest();
        expect(wrapper.find('img')).toHaveProp('src', 'placeholder.png');
    });

    it('renders an image with correct data-src', () => {
        useImage.mockImplementation(() => 'test.png');
        const { wrapper } = setupTest();
        expect(wrapper.find('img')).toHaveProp('data-src', 'src');
    });

    it('renders an image with correct image after the image has loaded', () => {
        useImage.mockImplementation(() => 'test.png');
        const { wrapper } = setupTest();
        expect(wrapper.find('img')).toHaveProp('src', 'test.png');
    });

    it('renders an image with alt', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find('img')).toHaveProp('alt', requiredProps.alt);
    });

    it('renders sources with placeholder on render', () => {
        useImage.mockImplementation(
            require.requireActual('../../hooks/use-image').default
        );
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
        expect(wrapper.find('source').at(0)).toHaveProp(
            'srcSet',
            'placeholder.png'
        );
        expect(wrapper.find('source').at(0)).toHaveProp(
            'media',
            '(min-width: 200px)'
        );
        expect(wrapper.find('source').at(0)).toHaveProp(
            'data-srcset',
            'srcSet1'
        );
        expect(wrapper.find('source').at(1)).toHaveProp(
            'srcSet',
            'placeholder.png'
        );
        expect(wrapper.find('source').at(1)).toHaveProp(
            'media',
            '(min-width: 300px)'
        );
        expect(wrapper.find('source').at(1)).toHaveProp(
            'data-srcset',
            'srcSet2'
        );
    });

    it('renders image with correct sources after the image has loaded', () => {
        useImage.mockImplementation(() => 'test.png');
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
        expect(wrapper.find('source').at(0)).toHaveProp('srcSet', 'test.png');
        expect(wrapper.find('source').at(0)).toHaveProp(
            'media',
            '(min-width: 200px)'
        );
        expect(wrapper.find('source').at(1)).toHaveProp('srcSet', 'test.png');
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
