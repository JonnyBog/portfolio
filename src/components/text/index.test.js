import React from 'react';
import { setupTestComponent } from '../../setupTests';

import Text from '.';

const setupTestWithString = setupTestComponent({
    render: () => <Text>Im some text</Text>
});

const setupTestWithNode = setupTestComponent({
    render: () => (
        <Text>
            <span>Im some text</span>
        </Text>
    )
});

describe('Components: Text', () => {
    it('renders a Text when its children is a string', () => {
        const { wrapper } = setupTestWithString();
        expect(wrapper.find('[data-qa="text"]')).toHaveText('Im some text');
    });

    it('accepts children when it is a node', () => {
        const { wrapper } = setupTestWithNode();
        expect(wrapper.find('[data-qa="text"] span')).toHaveText(
            'Im some text'
        );
    });

    it('renders correct className of text', () => {
        const { wrapper } = setupTestWithString();
        expect(wrapper.find('[data-qa="text"]')).toHaveClassName('text');
    });

    it('renders a default text p element', () => {
        const { wrapper } = setupTestWithString();
        expect(wrapper.find('p[data-qa="text"]')).toExist();
    });

    it('renders Text with className small', () => {
        const { wrapper } = setupTestWithString();
        expect(wrapper.find('[data-qa="text"]')).toHaveClassName(
            Text.styles.small
        );
    });

    it('renders Text with className black', () => {
        const { wrapper } = setupTestWithString();
        expect(wrapper.find('[data-qa="text"]')).toHaveClassName(
            Text.colors.black
        );
    });

    it('renders Text with data-id', () => {
        const { wrapper } = setupTestWithString({
            props: {
                dataId: 'my-text'
            }
        });
        expect(wrapper.find('[data-id="my-text"]')).toExist();
    });

    it.each(Object.values(Text.elements))(
        'renders the element: %p when it is passed as a prop',
        (element) => {
            const { wrapper } = setupTestWithString({
                props: {
                    element: Text.elements[element]
                }
            });
            expect(wrapper.find(`${element}[data-qa="text"]`)).toExist();
        }
    );

    it.each(Object.values(Text.styles))(
        'renders the style: %p when it is passed as a prop',
        (style) => {
            const { wrapper } = setupTestWithString({
                props: {
                    style: Text.styles[style]
                }
            });
            expect(wrapper.find('[data-qa="text"]')).toHaveClassName(style);
        }
    );

    it.each(Object.values(Text.colors))(
        'renders the color: %p when it is passed as a prop',
        (color) => {
            const { wrapper } = setupTestWithString({
                props: {
                    color: Text.colors[color]
                }
            });
            expect(wrapper.find('[data-qa="text"]')).toHaveClassName(color);
        }
    );
});
