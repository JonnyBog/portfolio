import React from 'react';

import './index.css';

const Loader = () => (
  <div className="loader-wrapper" data-qa="loader">
    <div className="loader">
      <div className="loader-dot loader-dot--1"></div>
      <div className="loader-dot loader-dot--2"></div>
      <div className="loader-dot loader-dot--3"></div>
    </div>
  </div>
);

export default Loader;
