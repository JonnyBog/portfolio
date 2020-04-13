import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ErrorMessage from '../../components/error-message';
import Loader from '../../components/loader';
import Link from '../../components/link';
import Text from '../../components/text';
import Wrapper from '../../components/wrapper';

import { requestContact } from '../../redux/contact/actions';
import contactSelectors from '../../redux/contact/selectors';

import styles from './index.module.css';

export default () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestContact());
    }, [dispatch]);

    const {
        isInitial: isContactInitial,
        isPending: isContactPending,
        hasError: hasContactError
    } = useSelector(contactSelectors.getPredicate);
    const { description, number, email } = useSelector(
        contactSelectors.getSimple
    );

    if (hasContactError) {
        return (
            <ErrorMessage>
                Oops, something went wrong with loading the contact page.
            </ErrorMessage>
        );
    }

    if (isContactInitial || isContactPending) {
        return <Loader />;
    }

    return (
        <div className={styles.contact}>
            <Wrapper>
                <div className={styles.description}>
                    <Text style={Text.styles.large} dataId="description">
                        {description}
                    </Text>
                </div>
                <div className={styles.number}>
                    <Text style={Text.styles.medium} dataId="number">
                        <Link to={`tel:${number}`} isAnchor>
                            {number}
                        </Link>
                    </Text>
                </div>
                <Text style={Text.styles.medium} dataId="email">
                    <Link to={'mailto:' + email} isAnchor>
                        {email}
                    </Link>
                </Text>
            </Wrapper>
        </div>
    );
};
