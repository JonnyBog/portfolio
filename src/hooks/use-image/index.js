import { useEffect, useState } from 'react';

import toDataURL from './to-data-url';
import { prependRequest } from '../../lib/constants';

const placeholderImage = require('./placeholder.png');

export default url => {
  const [blob, setBlob] = useState(placeholderImage);

  useEffect(() => {
    toDataURL(`${prependRequest}${url}`).then(img => setBlob(img));
  }, [url]);

  return blob;
};
