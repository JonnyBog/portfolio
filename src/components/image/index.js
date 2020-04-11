import React from 'react';
import PropTypes from 'prop-types';

import useImage from '../../hooks/use-image';

const Source = ({ srcSet: srcSetRaw, width }) => {
  const srcSet = useImage(srcSetRaw);

  return (
    <source
      srcSet={srcSet}
      data-srcset={srcSetRaw}
      media={`(min-width: ${width}px)`}
    />
  );
};

Source.propTypes = {
  srcSet: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
};

const Image = ({ src: srcRaw, alt, sources, dataId }) => {
  const src = useImage(srcRaw);

  return (
    <picture data-qa="image" data-id={dataId}>
      {sources.map(({ srcSet, width }) => (
        <Source srcSet={srcSet} width={width} key={srcSet} />
      ))}
      <img src={src} alt={alt} data-src={srcRaw} />
    </picture>
  );
};

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
