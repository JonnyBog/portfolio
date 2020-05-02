import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.css';

const Source = ({ srcSet, width }) => (
    <source
        srcSet={srcSet}
        data-srcset={srcSet}
        media={`(min-width: ${width}px)`}
    />
);

Source.propTypes = {
    srcSet: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired
};

const Image = ({ src, alt, sources, dataId }) => (
    <picture data-qa="image" data-id={dataId}>
        {sources.map(({ srcSet, width }) => (
            <Source srcSet={srcSet} width={width} key={srcSet} />
        ))}
        <img src={src} alt={alt} data-src={src} className={styles.img} />
    </picture>
);

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    sources: PropTypes.arrayOf(
        PropTypes.shape({
            srcSet: PropTypes.string,
            width: PropTypes.number
        })
    ),
    dataId: PropTypes.string
};

Image.defaultProps = {
    sources: [],
    dataId: null
};

export default Image;
