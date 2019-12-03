import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useFirestore} from 'react-redux-firebase';
import ProjectList from '../projectlist/ProjectList';
import {getPagedProjects} from '../projectActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import {objectToArray} from '../../../app/utils/helpers';

const ProjectDashboard = () => {
    const dispatch = useDispatch();
    const firestore = useFirestore();
    const [loadingInitial, setLoadingInitial] = useState(true);

    const projects = useSelector(state => objectToArray(state.firestore.data.projects) || []);
    const moreProjects = useSelector(state => state.projects.moreProjects);
    const loading = useSelector(state => state.async.loading);

    useEffect(() => {
        const getProjects = async () => {
            await dispatch(getPagedProjects({firestore}));
        };
        if (projects.length === 0) {
            getProjects().then(() => {
                setLoadingInitial(false);
            })
        } else {
            setLoadingInitial(false);
        }

    }, [dispatch, firestore, projects]);

    const handleGetNextProjects = async () => {
        await dispatch(getPagedProjects({firestore}));
    };

    if (loadingInitial) return <LoadingComponent/>;
    return (
        <div>
            <div>
                <ProjectList projects={projects} loading={loading} moreProjects={moreProjects}
                           getNextProjects={handleGetNextProjects}/>
           
         
              
         
            
               
            </div>
        </div>
    );
};

export default ProjectDashboard;
