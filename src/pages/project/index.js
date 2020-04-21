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

import { requestProjects, resetProjects } from '../../redux/projects/actions';
import projectsSelectors from '../../redux/projects/selectors';

import styles from './index.module.css';

export default () => {
    const dispatch = useDispatch();

    const { slug } = useParams();
    useEffect(() => {
        dispatch(requestProjects(slug));
    }, [dispatch, slug]);

    useEffect(
        () => () => {
            dispatch(resetProjects());
        },
        [dispatch]
    );

    const {
        isInitial: isProjectsInitial,
        isPending: isProjectsPending,
        hasError: hasProjectsError
    } = useSelector(projectsSelectors.getPredicate);
    const projects = useSelector(projectsSelectors.getProjects);
    const project = projects[0];

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
        <Wrapper>
            <Tiles>
                <Tiles.Tile>
                    <div className={styles.title}>
                        <Text
                            element={Text.elements.h1}
                            style={Text.styles.large}
                            dataId="title"
                        >
                            {titleRendered}
                        </Text>
                    </div>
                    <div className={styles.img}>
                        <Image
                            src={sizes.medium_large}
                            alt={titleRendered}
                            sources={[
                                {
                                    srcSet: sizes['1536x1536'],
                                    width: sizes['medium_large-width']
                                },
                                {
                                    srcSet: sizes['twentytwenty-fullscreen'],
                                    width: sizes['1536x1536-width']
                                }
                            ]}
                        />
                    </div>
                    <div className={styles.created}>
                        <Text style={Text.styles.medium} dataId="created-width">
                            Built at: {created_with}
                        </Text>
                    </div>
                    <div className={styles.tools}>
                        <Text style={Text.styles.medium} dataId="tools">
                            Tools used: {tools}
                        </Text>
                    </div>

                    {project_link && (
                        <div className={styles.link}>
                            <Link to={project_link.url} isAnchor isExternal>
                                <Text element={Text.elements.div}>
                                    {project_link.title}
                                </Text>
                            </Link>
                        </div>
                    )}
                </Tiles.Tile>
            </Tiles>
        </Wrapper>
    );
};
