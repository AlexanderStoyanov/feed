import axios from 'axios';
import request from './common/request';
import receive from './common/receive';
import error from './common/error';

//Renames existing forum
export const REQUEST_RENAME = 'REQUEST_FORUMS';
export const RECEIVE_RENAME = 'RECEIVE_FORUMS';
export const FORUM_RENAME_FAILURE = 'FORUMS_REQUEST_FAILURE';
export const renameForum = (forumid, newName) => {
    return async dispatch => {
        dispatch(request(REQUEST_RENAME));
        try {
            let res = await axios.post('/api/forums/rename', { forumid: forumid, newForumName: newName });
            dispatch(receive(RECEIVE_RENAME, res.data.payload));
        } catch (err) {
            dispatch(error(FORUM_RENAME_FAILURE, err.message));
        }
    };
};

//Adds new forum
export const ADD_FORUM_REQUEST = 'ADD_FORUM_REQUEST';
export const ADD_FORUM_SUCCESS = 'ADD_FORUM_SUCCESS';
export const ADD_FORUM_FAILURE = 'ADD_FORUM_FAILURE';
export const addForum = (forumName) => {
    return async dispatch => {
        dispatch(request(ADD_FORUM_REQUEST));
        try {
            let res = await axios.post('/api/forums/add', { forumName: forumName });
            dispatch(receive(ADD_FORUM_SUCCESS, res.status));
        } catch (err) {
            dispatch(error(ADD_FORUM_FAILURE, err.message));
        }
    };
};

//Deletes forum
export const REQUEST_DELETE = 'REQUEST_DELETE';
export const RECEIVE_DELETE = 'RECEIVE_DELETE';
export const FORUM_DELETE_FAILURE = 'FORUM_DELETE_FAILURE';
export const deleteForum = (forumid) => {
    return async dispatch => {
        dispatch(request(REQUEST_DELETE));
        try {
            let res = await axios.post('/api/forums/delete', { forumid: forumid });
            dispatch(receive(RECEIVE_DELETE, res.data.payload));
        } catch (err) {
            dispatch(error(FORUM_DELETE_FAILURE, err.message));
        }
    };
};

//Restores forum from deletion
export const REQUEST_RESTORE = 'REQUEST_RESTORE';
export const RECEIVE_RESTORE = 'RECEIVE_RESTORE';
export const FORUM_RESTORE_FAILURE = 'FORUM_RESTORE_FAILURE';
export const restoreForum = (forumid) => {
    return async dispatch => {
        dispatch(request(REQUEST_RESTORE));
        try {
            let res = await axios.post('/api/forums/restore', { forumid: forumid });
            dispatch(receive(RECEIVE_RESTORE, res.data.payload));
        } catch (err) {
            dispatch(error(FORUM_RESTORE_FAILURE, err.message));
        }
    };
};

//Loads forums @init
export const REQUEST_FORUMS = 'REQUEST_FORUMS';
export const RECEIVE_FORUMS = 'RECEIVE_FORUMS';
export const FORUMS_REQUEST_FAILURE = 'FORUMS_REQUEST_FAILURE';
export const loadForums = () => {
    return async dispatch => {
        dispatch(request(REQUEST_FORUMS));
        try {
            let res = await axios.get('/api/forums/load');
            dispatch(receive(RECEIVE_FORUMS, res.data.payload));
        } catch (err) {
            dispatch(error(FORUMS_REQUEST_FAILURE, err.message));
        }
    };
};

//Loads current forum id in the userDetail store instance to use it for renaming or deleting the forum
export const EDIT_FORUM = 'EDIT_FORUM';
export const loadCurrentForumID = (currentForumID) => {
    return {
        type: EDIT_FORUM,
        payload: {
            currentForumID: currentForumID,
        }
    };
};