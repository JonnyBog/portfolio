import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Tile = ({ children, dataId }) => (
  <div className="tile" data-qa="tile" data-id={dataId}>
    {children}
  </div>
);

const Tiles = ({ children }) => (
  <div className="tiles" data-qa="tiles">
    {children}
  </div>
);

Tiles.Tile = Tile;

Tile.propTypes = {
  children: PropTypes.node.isRequired,
  dataId: PropTypes.string
};

Tile.defaultProps = {
  dataId: null
};

Tiles.propTypes = {
  children: PropTypes.node.isRequired
};

export default Tiles;
