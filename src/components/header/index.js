import React from 'react';

import Link from '../../components/link';
import Text from '../../components/text';
import { routes } from '../../lib/constants';

import './index.css';

const Header = () => (
  <header className="header" data-qa="header">
    <div className="name-container">
      <div className="name">
        <Text
          element={Text.elements.span}
          style={Text.styles.large}
          dataId="name-link"
        >
          <Link to={routes.home}>Jonny Boggon</Link>
        </Text>
      </div>
      <Text dataId="job-description">Frontend Developer</Text>
    </div>
    <div className="nav">
      <div className="nav__link">
        <Text element={Text.elements.span} dataId="contact-link">
          <Link to={routes.contact}>Contact</Link>
        </Text>
      </div>
    </div>
  </header>
);

export default Header;
