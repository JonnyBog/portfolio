import React from 'react';
import PropTypes from 'prop-types';

import Text from '../text';

import styles from './index.module.css';

const ErrorMessage = ({ children }) => (
    <div className={styles.errorMessage} data-qa="error-message">
        <Text color={Text.colors.red}>{children}</Text>
    </div>
);

ErrorMessage.propTypes = {
    children: PropTypes.string.isRequired
};

export default ErrorMessage;
