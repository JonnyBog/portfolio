import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

const Wrapper = ({ children }) => (
    <div className={styles.wrapper} data-qa="wrapper">
        {children}
    </div>
);

Wrapper.propTypes = {
    children: PropTypes.node.isRequired
};

export default Wrapper;
