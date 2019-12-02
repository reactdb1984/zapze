import {CREATE_PROJECT, DELETE_PROJECT, UPDATE_PROJECT, MORE_PROJECTS} from './projectConstants';
import { createReducer } from '../../app/utils/reducerUtils';

const initialState = {
  projects: [],
  moreProject: true
};

export const createProject = (state, payload) => {
  return [...state.projects, Object.assign({}, payload.project)];
};

export const updateProject = (state, payload) => {
  return [
    ...state.projects.filter(project => project.id !== payload.project.id),
    Object.assign({}, payload.project)
  ];
};

export const deleteProject = (state, payload) => {
  return [...state.projects.filter(project => project.id !== payload.projectId)];
};

export const moreProjects = (state) => {
  return {
    ...state.projects,
    moreProjects: false
  }
};

export default createReducer(initialState, {
  [CREATE_PROJECT]: createProject,
  [DELETE_PROJECT]: deleteProject,
  [UPDATE_PROJECT]: updateProject,
  [MORE_PROJECTS]: moreProjects
});
