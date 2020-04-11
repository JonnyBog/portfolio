import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ErrorMessage from '../../components/error-message';
import Image from '../../components/image';
import Link from '../../components/link';
import Loader from '../../components/loader';
import Text from '../../components/text';
import Tiles from '../../components/tiles';
import Wrapper from '../../components/wrapper';

import { requestProjects } from '../../actions/projects-actions';

import styles from './index.module.css';

export default () => {
    const dispatch = useDispatch();
    const {
        isInitial: isProjectsInitial,
        isPending: isProjectsPending,
        hasError: hasProjectsError,
        data
    } = useSelector((state) => state.projects);
    const { slug } = useParams();
    const project = data[0];

    useEffect(() => {
        dispatch(requestProjects(slug));
    }, [dispatch, slug]);

    if (
        hasProjectsError ||
        (!project && !isProjectsInitial && !isProjectsPending)
    ) {
        return (
            <ErrorMessage>
                Oops, something went wrong with loading the project.
            </ErrorMessage>
        );
    }

    if (isProjectsInitial || isProjectsPending) {
        return <Loader />;
    }

    const titleRendered = project.title.rendered;
    const { image, tools, created_with, project_link } = project.acf;
    const { sizes } = image;

    return (
        <div className={styles.project}>
            <Wrapper>
                <Tiles>
                    <Tiles.Tile>
                        <div className={styles.projectTitle}>
                            <Text
                                element={Text.elements.h1}
                                style={Text.styles.large}
                                dataId="title"
                            >
                                {titleRendered}
                            </Text>
                        </div>
                        <div className={styles.projectImg}>
                            <Image
                                src={sizes.medium_large}
                                alt={titleRendered}
                                sources={[
                                    {
                                        srcSet: sizes['1536x1536'],
                                        width: sizes['medium_large-width']
                                    },
                                    {
                                        srcSet:
                                            sizes['twentytwenty-fullscreen'],
                                        width: sizes['1536x1536-width']
                                    }
                                ]}
                            />
                        </div>
                        <div className={styles.projectCreated}>
                            <Text
                                style={Text.styles.medium}
                                dataId="created-width"
                            >
                                Built at: {created_with}
                            </Text>
                        </div>
                        <div className={styles.projectTools}>
                            <Text style={Text.styles.medium} dataId="tools">
                                Tools used: {tools}
                            </Text>
                        </div>
                        <div className={styles.projectLink}>
                            <Text>
                                <Link to={project_link.url} isAnchor isExternal>
                                    {project_link.title}
                                </Link>
                            </Text>
                        </div>
                    </Tiles.Tile>
                </Tiles>
            </Wrapper>
        </div>
    );
};
