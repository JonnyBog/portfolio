import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Wrapper = ({ children }) => (
  <div className="wrapper" data-qa="wrapper">
    {children}
  </div>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default Wrapper;
