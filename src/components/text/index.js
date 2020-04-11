import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './index.module.css';

const Text = ({ children, element: Element, color, style, dataId }) => (
    <Element
        className={cx(styles.text, styles[style], styles[color])}
        data-qa="text"
        data-id={dataId}
    >
        {children}
    </Element>
);

Text.styles = {
    large: 'large',
    medium: 'medium',
    small: 'small'
};

Text.elements = {
    p: 'p',
    span: 'span',
    h1: 'h1'
};

Text.colors = {
    grey: 'grey',
    black: 'black',
    red: 'red'
};

Text.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
        .isRequired,
    element: PropTypes.oneOf(Object.values(Text.elements)),
    color: PropTypes.oneOf(Object.values(Text.colors)),
    style: PropTypes.oneOf(Object.values(Text.styles)),
    dataId: PropTypes.string
};

Text.defaultProps = {
    element: Text.elements.p,
    color: Text.colors.black,
    style: Text.styles.small,
    dataId: null
};

export default Text;
