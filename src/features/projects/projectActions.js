import {toastr} from 'react-redux-toastr';
import {asyncActionStart, asyncActionFinish, asyncActionError} from '../async/asyncActions';
import {createNewProject, objectToArray} from '../../app/utils/helpers';
import {MORE_PROJECTS} from './projectConstants';

export const createProject = ({firebase, firestore}, project) => {
    return async (dispatch, getState) => {
        const user = firebase.auth().currentUser;
        const photoURL = getState().firebase.profile.photoURL;
        const newProject = createNewProject(user, photoURL, project, firestore);
        try {
            let createdProject = await firestore.add('projects', newProject);
            await firestore.set(`project_contributors/${createdProject.id}_${user.uid}`, {
                projectId: createdProject.id,
                userUid: user.uid,
                projectStartDate: Date.now(),
                creator: true
            });
            toastr.success('Success!', 'Project has been created');
            return createdProject;
        } catch (error) {
            console.log(error);
            toastr.error('Oops', 'Something went wrong');
        }
    };
};

export const updateProject = ({firestore}, project) => {
    return async (dispatch, getState) => {
        try {
            dispatch(asyncActionStart());
            let projectDocRef = firestore.collection('projects').doc(project.id);
            let dateEqual = getState().firestore.ordered.projects[0].date.isEqual(project.date);
            if (!dateEqual) {
                let batch = firestore.batch();
                batch.update(projectDocRef, project);

                let projectContributorRef = firestore.collection('project_contributor');
                let projectContributorQuery = await projectContributorRef.where('projectId', '==', project.id);
                let projectContributorQuerySnap = await projectContributorQuery.get();

                for (let i = 0; i < projectContributorQuerySnap.docs.length; i++) {
                    let projectContributorRef = firestore
                        .collection('project_contributor')
                        .doc(projectContributorQuerySnap.docs[i].id);

                    batch.update(projectContributorRef, {
                        projectDate: project.date
                    })
                }
                await batch.commit();
            } else {
                await projectDocRef.update(project);
            }
            toastr.success('Success!', 'project has been updated');
            dispatch(asyncActionFinish());
        } catch (error) {
            dispatch(asyncActionError());
            toastr.error('Oops', 'Something went wrong');
        }
    };
};

export const cancelToggle = ({firestore}, cancelled, projectId) =>
    async dispatch => {
        const message = cancelled
            ? 'Are you sure you want to cancel the project?'
            : 'This will reactivate the project - are you sure?Ì';
        try {
            toastr.confirm(message, {
                onOk: () =>
                    firestore.update(`project/${projectId}`, {
                        cancelled: cancelled
                    })
            });
        } catch (error) {
            console.log(error);
        }
    };

export const getPagedEvents = ({firestore}) =>
    async (dispatch, getState) => {
        dispatch(asyncActionStart());
        const LIMIT = 2;
        let nextEventSnapshot = null;
        const {firestore: {data: {events: items}}} = getState();
        if (items && Object.keys(items).length >= LIMIT) {
            let itemsArray = objectToArray(items);
            nextEventSnapshot = await firestore.collection('events').doc(itemsArray[itemsArray.length - 1].id).get();
        }

        let querySnap = await firestore.get({
            collection: 'events',
            limit: LIMIT,
            where: ['date', '>=', new Date()],
            orderBy: ['date'],
            startAfter: nextEventSnapshot,
            storeAs: 'events'
        });

        if (querySnap.docs.length < LIMIT) {
            dispatch({type: MORE_PROJECTS});
        }
        dispatch(asyncActionFinish());
    };

export const addEventComment = ({firebase}, eventId, values, parentId) =>
    async (dispatch, getState) => {
        const profile = getState().firebase.profile;
        const user = firebase.auth().currentUser;
        let newComment = {
            parentId: parentId,
            displayName: profile.displayName,
            photoURL: profile.photoURL || '/assets/user.png',
            uid: user.uid,
            text: values.comment,
            date: Date.now()
        };
        try {
            await firebase.push(`event_chat/${eventId}`, newComment);
        } catch (error) {
            console.log(error);
            toastr.error('Oops', 'Problem adding comment');
        }
    };
