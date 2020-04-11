import React from 'react';
import { setupTestComponent } from '../../setupTests';

import Tiles from '.';

const setupTest = setupTestComponent({
    render: () => (
        <Tiles>
            <Tiles.Tile dataId="tile-1">
                <div>Tile 1</div>
            </Tiles.Tile>
            <Tiles.Tile dataId="tile-2">
                <div>Tile 2</div>
            </Tiles.Tile>
        </Tiles>
    )
});

describe('Components: Tiles', () => {
    it('renders correct className on Tiles', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find('[data-qa="tiles"]')).toHaveClassName('tiles');
    });

    it('should display tile 1', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find('[data-qa="tiles"] [data-id="tile-1"]')).toHaveText(
            'Tile 1'
        );
    });

    it('should display tile 2', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find('[data-qa="tiles"] [data-id="tile-2"]')).toHaveText(
            'Tile 2'
        );
    });

    it('renders a Tile with a data-qa', () => {
        const { wrapper } = setupTest();
        expect(wrapper.find('[data-qa="tiles"]')).toExist();
    });
});
