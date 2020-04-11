import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Text from '../../components/text';
import Tiles from '../../components/tiles';
import Image from '../../components/image';
import Link from '../../components/link';
import Loader from '../../components/loader';
import ErrorMessage from '../../components/error-message';
import Wrapper from '../../components/wrapper';

import { requestHome } from '../../actions/home-actions';
import { requestProjects } from '../../actions/projects-actions';

import { routes } from '../../lib/constants';

import styles from './index.module.css';

export default () => {
    const dispatch = useDispatch();
    const {
        isInitial: isHomeInitial,
        isPending: isHomePending,
        hasError: hasHomeError,
        data: home
    } = useSelector((state) => state.home);
    const {
        isInitial: isProjectsInitial,
        isPending: isProjectsPending,
        hasError: hasProjectsError,
        data: projects
    } = useSelector((state) => state.projects);

    useEffect(() => {
        dispatch(requestHome());
        dispatch(requestProjects());
    }, [dispatch]);

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
                    {home.acf.description}
                </Text>
            </div>

            <div className={styles.pageHeading}>
                <Text
                    element={Text.elements.h1}
                    style={Text.styles.large}
                    dataId="page-heading"
                >
                    {home.acf.heading}
                </Text>
            </div>

            <Tiles>
                {projects.map(({ slug, title, acf }) => {
                    const titleRendered = title.rendered;

                    return (
                        <Link to={`${routes.project}/${slug}`} key={slug}>
                            <Tiles.Tile dataId={slug}>
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
                    );
                })}
            </Tiles>
        </Wrapper>
    );
};
