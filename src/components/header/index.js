import React from 'react';

import Link from '../../components/link';
import Text from '../../components/text';
import { routes } from '../../lib/constants';

import styles from './index.module.css';

const Header = () => (
    <header className={styles.header} data-qa="header">
        <div className={styles.nameDescription}>
            <div className={styles.name}>
                <Text
                    element={Text.elements.span}
                    style={Text.styles.large}
                    dataId="name-link"
                >
                    <Link to={routes.home}>Jonny Boggon</Link>
                </Text>
            </div>
            <Text dataId="job-description" element={Text.elements.span}>
                Frontend Developer
            </Text>
        </div>
        <div className={styles.nav}>
            <div className={styles.navLink}>
                <Text element={Text.elements.div} dataId="contact-link">
                    <Link to={routes.contact}>Contact</Link>
                </Text>
            </div>
        </div>
    </header>
);

export default Header;
