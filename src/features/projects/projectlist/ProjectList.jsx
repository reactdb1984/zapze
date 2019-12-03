import React, {Fragment} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ProjectListItem from './ProjectListItem';

const ProjectList = ({projects, moreEvents, getNextEvents, loading}) =>
    <Fragment>
        {projects && projects.length !== 0 &&
        <InfiniteScroll
            pageStart={0}
            loadMore={getNextEvents}
            hasMore={!loading && moreEvents}
            initialLoad={false}
        >
            {projects && projects.map(project => (
                <ProjectListItem
                    key={project.id}
                    project={project}
                />
            ))}
        </InfiniteScroll>
        }

    </Fragment>;

export default ProjectList;

