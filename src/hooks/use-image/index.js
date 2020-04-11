import { useEffect, useState } from 'react';

import { prependRequest } from '../../lib/constants';
import toDataURL from './to-data-url';

const placeholderImage = require('./placeholder.png');

export default (url) => {
    const [blob, setBlob] = useState(placeholderImage);

    useEffect(() => {
        toDataURL(`${prependRequest}${url}`).then((img) => setBlob(img));
    }, [url]);

    return blob;
};
