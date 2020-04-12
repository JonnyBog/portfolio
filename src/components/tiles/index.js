import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './index.module.css';

const Tile = ({ children, dataId }) => (
    <div className={styles.tile} data-qa="tile" data-id={dataId}>
        {children}
    </div>
);

Tile.propTypes = {
    children: PropTypes.node.isRequired,
    dataId: PropTypes.string
};

Tile.defaultProps = {
    dataId: null
};

const Tiles = ({ children }) => (
    <div
        className={cx(styles.tiles, {
            [styles.isFullWidth]: !Array.isArray(children)
        })}
        data-qa="tiles"
    >
        {children}
    </div>
);

Tiles.Tile = Tile;

Tiles.propTypes = {
    children: PropTypes.node.isRequired
};

export default Tiles;
