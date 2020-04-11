import React from 'react';
import cx from 'classnames';

import styles from './index.module.css';

const Loader = () => (
    <div className={styles.loaderWrapper} data-qa="loader">
        <div className={styles.loader}>
            <div className={cx(styles.loaderDot, styles.loaderDot1)} />
            <div className={cx(styles.loaderDot, styles.loaderDot2)} />
            <div className={cx(styles.loaderDot, styles.loaderDot3)} />
        </div>
    </div>
);

export default Loader;
