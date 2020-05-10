import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Text from '../../components/text';
import Tiles from '../../components/tiles';
import Image from '../../components/image';
import Link from '../../components/link';
import Loader from '../../components/loader';
import ErrorMessage from '../../components/error-message';
import Wrapper from '../../components/wrapper';

import {
    actions as homeActions,
    selectors as homeSelectors
} from '../../redux/home';
import {
    actions as projectsActions,
    selectors as projectsSelectors
} from '../../redux/projects';

import { routes } from '../../lib/constants';

import styles from './index.module.css';

export default () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(homeActions.requestHome());
        dispatch(projectsActions.requestProjects());
    }, [dispatch]);

    useEffect(
        () => () => {
            dispatch(projectsActions.resetProjects());
        },
        [dispatch]
    );

    const {
        isInitial: isHomeInitial,
        isPending: isHomePending,
        hasError: hasHomeError
    } = useSelector(homeSelectors.getPredicate);
    const { description, heading } = useSelector(homeSelectors.getSimple);

    const {
        isInitial: isProjectsInitial,
        isPending: isProjectsPending,
        hasError: hasProjectsError
    } = useSelector(projectsSelectors.getPredicate);
    const projects = useSelector(projectsSelectors.getProjects);

    if (hasHomeError || hasProjectsError) {
        return (
            <ErrorMessage>
                Oops, something went wrong with loading the homepage.
            </ErrorMessage>
        );
    }

    if (
        isHomeInitial ||
        isHomePending ||
        isProjectsInitial ||
        isProjectsPending
    ) {
        return <Loader />;
    }

    return (
        <Wrapper>
            <div className={styles.description}>
                <Text style={Text.styles.medium} dataId="description">
                    {description}
                </Text>
            </div>

            <div className={styles.pageHeading}>
                <Text
                    element={Text.elements.h1}
                    style={Text.styles.large}
                    dataId="page-heading"
                >
                    {heading}
                </Text>
            </div>

            <Tiles>
                {projects.map(({ slug, title, acf }) => {
                    const titleRendered = title.rendered;

                    return (
                        <div className={styles.project} key={slug}>
                            <Link
                                to={`${routes.project}/${slug}`}
                                dataId={slug}
                            >
                                <Tiles.Tile>
                                    <div className={styles.projectImg}>
                                        <Image
                                            src={acf.image.sizes.medium_large}
                                            alt={titleRendered}
                                            sources={[
                                                {
                                                    srcSet:
                                                        acf.image.sizes[
                                                            'post-thumbnail'
                                                        ],
                                                    width:
                                                        acf.image.sizes[
                                                            'medium_large-width'
                                                        ]
                                                }
                                            ]}
                                        />
                                    </div>
                                    <div className={styles.projectTitle}>
                                        <Text style={Text.styles.medium}>
                                            {titleRendered}
                                        </Text>
                                    </div>
                                </Tiles.Tile>
                            </Link>
                        </div>
                    );
                })}
            </Tiles>
        </Wrapper>
    );
};
